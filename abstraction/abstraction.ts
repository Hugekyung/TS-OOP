// * 객체지향 프로그래밍 방식으로 커피머신 만들기
// * 캡슐화
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7; // * private 키워드를 붙이면 외부에서 내부 멤버변수에 접근 불가
    protected coffeeBeans = 0; // * protected 키워드를 사용하면 private과 동일하게 여전히 외부에서 접근은 불가하지만, 해당 클래스를 상속받은 자식 클래스 내부에서는 접근이 가능하다.
    // * constructor에 대한 접근도 private으로 설정 해주는게 안전하다.
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number): void {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    private grindBeans(shots: number): void {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT; // * 사용한 만큼의 커피콩을 줄여줌
    }

    private preHeat(): void {
      console.log('heating up...');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preHeat();
      return this.extract(shots);
    }
  }

  const maker = CoffeeMachine.makeMachine(32);
  // * private 키워드를 통해 정말 필요한 메소드만 외부에 노출되게 하는 방식으로 추상화를 할 수 있다.
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);
}
