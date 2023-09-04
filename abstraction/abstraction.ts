// * 객체지향 프로그래밍 방식으로 커피머신 만들기
// * 캡슐화
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
    private constructor(coffeeBeans: number) {
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

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  // * private 키워드를 통해 정말 필요한 메소드만 외부에 노출되게 하는 방식으로 추상화를 할 수 있다.
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);

  const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  // * private 키워드를 통해 정말 필요한 메소드만 외부에 노출되게 하는 방식으로 추상화를 할 수 있다.
  maker2.fillCoffeeBeans(32);
  maker2.makeCoffee(2);
  maker2.clean();

  // * 어떤 인터페이스를 상속 받느냐에 따라 클래스의 역할과 기능에 제한을 둘 수 있다.
  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log('ama', coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log('pro', coffee);
      this.machine.fillCoffeeBeans(40);
      this.machine.clean();
    }
  }

  const machine = CoffeeMachine.makeMachine(50);
  const ama = new AmateurUser(machine);
  const pro = new ProBarista(machine);
  ama.makeCoffee();
  pro.makeCoffee();
}
