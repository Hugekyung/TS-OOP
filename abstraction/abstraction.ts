// * 객체지향 프로그래밍 방식으로 커피머신 만들기
// * 추상화
// * 추상 클래스는 해당 클래스를 상속 받을 자식 클래스의 세부 구현 사항에 대한 기능과 타입 등을 미리 지정해줄 수 있는 역할을 한다.
abstract class BaseCoffeeMachine {
  constructor(protected beans: number) {}

  abstract getBeans(): number;
  abstract grindBeans(): string;
  abstract getCoffee(): string;
}

// * abstract class에 선언되어 있는 메소드는 상속받은 자식 클래스에서 반드시 구현해야 한다.
class CheapCoffeeMachine extends BaseCoffeeMachine {
  constructor(beans: number) {
    super(beans);
  }

  getBeans(): number {
    return this.beans;
  }

  grindBeans(): string {
    console.log('Grinding Beans ...');
    const grindedBeans = 'Grinded Beans';
    return grindedBeans;
  }

  getCoffee() {
    console.log('Get Coffee By Grinding Beans ...');
    const Coffee = 'One Espresso Shot';
    return Coffee;
  }
}

const coffee = new CheapCoffeeMachine(30);
console.log(coffee);
console.log(coffee.getBeans());
console.log(coffee.grindBeans());
console.log(coffee.getCoffee());
