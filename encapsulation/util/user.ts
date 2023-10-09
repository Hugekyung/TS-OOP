export class UserFunction {
  constructor() {}

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
}
