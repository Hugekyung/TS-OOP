// * 객체지향 챌린지 - 스택 구현하기

interface BasicStack {
  // todo: Get Stack
  getStack(): Array<string>;
  // todo: Add String to Stack
  addStringtoStack(str: string): void;
  // todo: Pop from Stack
  popStringfromStack(): string | undefined;
}

class Stack implements BasicStack {
  stack: Array<string>;
  constructor() {
    this.stack = [];
  }

  getStack(): string[] {
    return this.stack;
  }

  addStringtoStack(str: string): void {
    this.stack.push(str);
  }

  popStringfromStack(): string | undefined {
    const popedString = this.stack.pop();
    return popedString;
  }
}

const stack = new Stack();
stack.addStringtoStack('첫 번째 스택');
stack.addStringtoStack('두 번째 스택');
console.log('현재 stack : ', stack.getStack());
stack.addStringtoStack('세 번째 스택');
console.log('삭제한 문자열 : ', stack.popStringfromStack());
console.log('현재 stack : ', stack.getStack());
