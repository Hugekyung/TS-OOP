// * 객체지향 프로그래밍 방식으로 커피머신 만들기
// * 다형성
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7;
    protected coffeeBeans = 0;
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
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
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

  class CaffeLatteMachine extends CoffeeMachine {
    // * 자식 클래스에서 constructor를 사용하려면 super 키워드를 통해 부모의 constructor를 받아와야 한다.
    // * MilkStemer 클래스를 상속 받아 steamMilk 함수를 통해 메소드 사용
    constructor(private beans: number, private milkSteamer: MilkSteamer) {
      super(beans);
    }

    makeCoffee(shots: number) {
      const coffee = super.makeCoffee(shots); // * 부모 클래스의 makeCoffee를 호출
      this.milkSteamer.steamMilk();
      return { shots, hasMilk: true };
    }
  }

  class MilkSteamer {
    steamMilk() {
      console.log('Steaming Milk 🥛');
    }
  }

  const milkSteamer = new MilkSteamer();
  const caffeLatteMachine = new CaffeLatteMachine(30, milkSteamer);
  console.log('caffeLatteMachine >>', caffeLatteMachine.makeCoffee(2));
}
