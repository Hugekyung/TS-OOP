import { LocalDateTime } from 'js-joda';
import { EmailLoginReqDto } from './dto/login-dto';
import { DateService } from './util/date';
import { UserFunction } from './util/user';

async function loginByEmail(
  deviceType: string,
  locale: string,
  body: EmailLoginReqDto
) {
  const { email, password, isKeepSignIn } = body;
  const user = this.userRepository.findUserByEmail(email);
  if (!user) {
    return new Error('존재하지 않는 유저');
  }

  let data: any = null;
  UserFunction.checkDisabledUser(user);
  UserFunction.checkEmailLoginBySocialUser(user);
  UserFunction.banCheck(user);

  if (user.password === password) {
    // * userAccountId로 해당 유저의 전체 userAccounts 조회 후 2개 이상 -> 계정 선택
    const integrationAccountData = this.checkUserAccounts(null, user.id);
    if (integrationAccountData) {
      return integrationAccountData;
    }

    // * 휴면 계정으로 전환 예정 유저일 경우 휴면 메일 발송을 false로 변경
    if (user.mail) {
      user.mail.noticeDeleted = false;
      user.mail.tobeDeleted = false;
    }

    // * 로그인 시 업데이트 컬럼
    user.lastLoginAt = DateService.convertLocalDateTime2JsDate(
      LocalDateTime.now()
    );
    user.loginCount++;
    // * 로그인 갱신 으로 인한 계정 삭제 메일 초기화
    user.mail.noticeDeleted = false;
    user.mail.tobeDeleted = false;
    this.userRepository.save(user);

    // * 로그인 성공 시 토큰 발급
    const jwtData = this.jwtServcie.getToken(user.id, isKeepSignIn);
    if (!jwtData) {
      return new Error('데이터가 없음.');
    }
    const { accessToken, refreshToken } = jwtData;

    // 앱에서 최초 로그인 시, 앱 전용 웰컴쿠폰 발급 & User > 앱 설치 여부 true
    if (
      !user.downloadApp &&
      (deviceType === 'android' || deviceType === 'ios' || deviceType === 'app')
    ) {
      // * 쿠폰 지급 보류
      const couponId: number = locale === 'en' ? 6091 : 6090;
      const coupon = this.couponRepository.findOneById(couponId);
      if (!coupon) {
        return new Error('해당 쿠폰이 없음');
      }
      const userCoupon = this.userCouponRepository.create();
      userCoupon.coupon = coupon;
      userCoupon.user = user;
      const expireDate = DateService.convertLocalDateTime2JsDate(
        LocalDateTime.now().plusDays(7)
      );
      userCoupon.expire = expireDate;
      this.userCouponRepository.save(userCoupon);

      // * 앱 설치 여부
      user.downloadApp = true;
      this.userRepository.save(user);
    }

    data = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      type: 'email',
    };
  } else {
    return new Error('비밀번호 틀림'); // * 비밀번호 불일치
  }

  // * (UserAccount row가 1개인 계정 대상)UserAccount.email 값이 빈 string인 경우, 로그인한 계정의 email을 업데이트
  const userAccounts = this.userAccountRepository.findManyByUser(user.id);
  await UserFunction.checkUserAccountAndFillEmail(userAccounts, email);

  if (!data) {
    return new Error('데이터가 없음');
  }

  return { resultCode: 1, data: data };
}
