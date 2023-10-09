export class UserFunction {
  static userAccountRepository: any;
  constructor() {}

  // ? 영구 정지 회원 판별
  static banCheck(user) {
    if (user.userBan) {
      for (const userBan of user.userBan) {
        // * 영구 정지 회원인 경우
        if (userBan.banLevel === 3) {
          return new Error('영구 정지 회원입니다.');
        }
      }
    }
  }

  // ? 탈퇴한 회원 판별
  static checkDisabledUser(user) {
    if (user.accountStatus === 'disable') {
      return new Error('이미 탈퇴한 회원입니다.');
    }
  }

  // ? 소셜회원의 이메일 로그인 시도
  static checkEmailLoginBySocialUser(user) {
    if (user.password === '') {
      return new Error('로그인이 불가합니다.'); // * 소셜 회원의 이메일 로그인 시도
    }
  }

  // ? UserAccount에 정보가 누락된 회원에 대한 계정처리
  static async checkUserAccountAndFillEmail(userAccounts, email) {
    if (
      userAccounts.length === 1 &&
      userAccounts[0].type === 'email' &&
      userAccounts[0].email === ''
    ) {
      userAccounts[0].email = email;
      await this.userAccountRepository.save(userAccounts[0]);
    }
  }
}
