// * 객체지향 프로그래밍 방식으로 커피머신 만들기
// * 상속성
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // * 구현할 클래스의 명세를 작성한다.
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  // * interface를 implementations한다.
  // * interface 2개를 implementations할 수 있으며 2개의 명세를 모두 만족해야 한다.
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7; // * private 키워드를 붙이면 외부에서 내부 멤버변수에 접근 불가
    protected coffeeBeans = 0; // * protected 키워드를 사용하면 private과 동일하게 여전히 외부에서 접근은 불가하지만, 해당 클래스를 상속받은 자식 클래스 내부에서는 접근이 가능하다.
    // * constructor에 대한 접근도 private으로 설정 해주는게 안전하다.
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    clean(): void {
      console.log('cleaning the machine.');
    }

    static makeMachine(coffeeBeans: number) {
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

  // * CoffeeMachine 클래스 상속
  class DeCaffeinCoffee extends CoffeeMachine {
    constructor(private coffeeBean: number) {
      super(coffeeBean);
      this.coffeeBean = coffeeBean;
    }
  }

  const decaffein = new DeCaffeinCoffee(30);
}
