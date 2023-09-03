// * 객체지향 프로그래밍 방식으로 커피머신 만들기
interface CoffeeCup {
  shots: number;
  hasMilk: boolean;
}

class CoffeeMachine {
  coffeeBeans: number;
  BEANS_GRAM_PER_SHOT: number;
  constructor(coffeeBeans: number, BEANS_GRAM_PER_SHOT: number) {
    this.coffeeBeans = coffeeBeans;
    this.BEANS_GRAM_PER_SHOT = BEANS_GRAM_PER_SHOT;
  }

  makeCoffee(shots: number): CoffeeCup {
    if (this.coffeeBeans < shots * this.BEANS_GRAM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
    }
    this.coffeeBeans -= shots * this.BEANS_GRAM_PER_SHOT;

    return {
      shots,
      hasMilk: false,
    };
  }
}

const instance_coffeeMachine = new CoffeeMachine(10, 5);
console.log(instance_coffeeMachine.makeCoffee(2));
