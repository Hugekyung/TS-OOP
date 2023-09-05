# 객체지향 프로그래밍 with TypeScript

## 객체지향 프로그래밍

- 객체지향 프로그래밍은 프로그래밍을 작성하는 하나의 패러다임이다.

## 절차지향 vs 객체지향

`절차지향 프로그래밍`

- 절차에 따라 기능이 동작하기 때문에, 전체적인 플로우를 이해하고 있어야 한다.
- 모든 플로우가 연결되어 있어, 한 곳을 수정하더라도 다른 부분에 문제가 생기는 <strong>사이드 이펙트</strong>가 발생할 가능성이 높다.
- 절차지향 프로그래밍으로 개발된 애플리케이션은 한눈에 이해(파악)하기 어렵다.
- 유지보수가 어렵고, 확장성이 떨어진다.

`객체지향 프로그래밍`

- 프로그램을 객체로 정의해서 객체들끼리 서로 의사소통하도록 디자인, 코딩하는 것을 말한다.
- 각각의 기능이 객체로 구성되어 있기 때문에 해당 기능의 객체만 이해하고 수정하면 된다.
- 재사용성과 확장성이 높다.

## 클래스와 객체

`Class`

- 데이터가 없는 템플릿을 말한다(어떤 타입의 object가 있는지 설명하는 명세).
- 한 번의 선언만 이루어진다.
- 붕어빵 틀

`Object`

- 데이터가 있는 클래스의 인스턴스이다.
- 여러 번 생성될 수 있다.
- 붕어빵

## 객체 지향의 특성

`Encapsulation(캡슐화)`

- 관련 있는 내용들(데이터와 함수 등)을 한 데 모으는 것을 캡슐화한다고 한다.
- 외부에서 내부 상태에 대한 수정을 가할 수는 없지만, 외부에서의 행동에 의해 내부 상태를 변경할 수 있다.

`Abstraction(추상성)`

- 내부 구조를 모두 이해하지 않더라도(내부 로직의 복잡성, 이해도에 관계없이) 외부에서 구현된 interface를 통해 사용할 수 있게 하는 것을 추상성이라고 한다.

`Inheritance(상속성)`

- 이미 구현된 다른 클래스를 상속 받아 새로운 기능이 추가된 클래스를 생성할 수 있는 것을 상속성이라고 한다.
- 한 번 잘 구현한 클래스를 재사용할 수 있게 하는 것과 관련이 있는 개념이다.
- parent-child, super-sub 관계라고도 하며, IS-A라고 해서 "Coffee-Machine(부모 클래스)는 Espresso-Machine(자식 클래스)이다"라는 표현 방식으로 설명할 수 있다.

`Polymorphism(다형성)`

- 공통적인 속성을 가진 여러 개의 인스턴스를 생성할 수 있다는 개념을 다형성이라고 한다.
- 클래스의 상속을 통해 다양한 역할과 기능을 가진 자식 클래스를 여러 개 생성할 수 있다.

## 클래스의 멤버변수

`class-level`

- static 키워드를 사용하면 class level 변수가 된다.
- static 키워드가 붙은 멤버변수는 클래스와 연결되어 있으므로 인스턴스가 생성될 때마다 재생성되지 않아 메모리 낭비가 줄어든다.

```ts
class CoffeeMaker {
  static BEANS_GRAM_PER_SHOT = 7;
  coffeeBeans = 0;
}

const maker = new CoffeeMaker();
console.log(maker); // CoffeeMaker { coffeeBeans: 0 }
```

</br>

`instance-level`

- instance(object) level
- static 키워드를 사용하지 않은 멤버변수는 인스턴스가 생성될 때마다 재생성된다.

```ts
class CoffeeMaker {
  static BEANS_GRAM_PER_SHOT = 7;
  coffeeBeans = 0;
}

const maker = new CoffeeMaker();
console.log(maker); // CoffeeMaker { BEANS_GRAM_PER_SHOT: 7, coffeeBeans: 30 }
```

## 클래스 접근 제어자 관련 키워드

`public`

- 내부, 외부 어디서든 접근 가능하다.
- 아무런 키워드를 붙이지 않을 경우 기본적으로 public 취급한다.

`private`

- 외부에서 내부의 멤버변수나 함수에 접근하지 못하게 한다.
- constructor에 대한 접근도 private으로 설정 해주는게 안전하다.

`static`

- 클래스 자체에 연결되도록 한다.
- 클래스 생성 시 한 번만 생성되어 메모리 낭비를 줄일 수 있다.

`protected`

- protected 키워드를 사용하면 private과 동일하게 여전히 외부에서 접근 불가하다.
- 해당 클래스를 상속받은 자식 클래스 내부에서는 접근이 가능하다.
