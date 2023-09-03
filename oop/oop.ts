// * 객체지향 프로그래밍 방식으로 커피머신 만들기
// * without-oop 기반 객체지향 프로그래밍 코드로 변환 코드
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    // ? 멤버변수
    static BEANS_GRAM_PER_SHOT = 7; // * static 키워드를 사용하면 class level 변수가 된다. -> 클래스와 연결되어 있으므로 인스턴스가 생성될 때마다 재생성되지 않아 메모리 낭비가 줄어든다.
    coffeeBeans = 0; // * instance(object) level -> 인스턴스가 생성될 때마다 재생성된다.
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT; // * 사용한 만큼의 커피콩을 줄여줌

      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(30);
  console.log(maker);

  const maker2 = new CoffeeMaker(30);
  console.log(maker2);

  const maker3 = CoffeeMaker.makeMachine(30);
  console.log(maker3);
}
