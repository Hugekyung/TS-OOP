{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  const BEANS_GRAM_PER_SHOT = 7;

  let coffeeBeans = 0; // * 보유한 커피 콩의 그램 수
  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
    }
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT; // * 사용한 만큼의 커피콩을 줄여줌

    return {
      shots,
      hasMilk: false,
    };
  }

  coffeeBeans += 2 * BEANS_GRAM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log(coffee);
}
