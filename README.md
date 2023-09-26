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

- 관련 있는 내용들(데이터와 함수 등)을 한 데 모으고, 기능의 구현을 외부에 감추는 것을 캡슐화한다고 한다.
- 외부에서 내부 상태에 대한 수정을 가할 수는 없지만, 외부에서의 행동에 의해 내부 상태를 변경할 수 있다.
- 데이터 보호: 외부로부터 클래스에 정의된 속성과 기능들을 보호
- 데이터 은닉: 내부의 동작을 감추고 외부에는 필요한 부분만 노출
- 캡슐화를 잘 해두면 연쇄적인 코드 변경 전파를 최소화할 수 있다.

```ts
// 아래와 같은 코드가 있을 때
if (account.getAccountStatus() === AccountStatus.enable) {
  // logic ~
}

// 위 코드는 해당 로직의 조건이 늘어날 때마다 하나씩 조건을 추가해줘야 하는 번거로움이 있다.
// 따라서 아래와 같이 캡슐화를 통해 데이터를 직접 비교하지 않고, 로직 수행 내용을 캡슐화한다.
if (account.checkAccountStatusEnabled()) {
  // logic ~
}

// => 캡슐화를 통해 해당 로직에 변화가 있을 때는 checkAccountStatusEnabled 함수 내부의 코드만 수정하면 된다.
```

`Abstraction(추상성)`

- 내부 구조를 모두 이해하지 않더라도(내부 로직의 복잡성, 이해도에 관계없이) 외부에서 구현된 interface를 통해 사용할 수 있게 하는 것을 추상성이라고 한다.
- 추상화: 세부사항은 제거하고 객체의 공통적인 속성(변수)과 기능(메서드)을 추출하여 정의하는 것.

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

## 상속의 문제점

- 상속은 이미 구현되어 있는 클래스를 가져다 다양한 기능을 추가하거나 수정하여 여러 개의 클래스를 생성하기 쉽다는 장점이 있다.
- 하지만, 반대로 수직구조이기 때문에 부모클래스가 수정되면 변경되면 모든 자식 클래스에게 영향을 미치기 때문에 의존도가 높은 단점이 있다.
- 상속관계가 추가될수록 시스템의 결합도가 높아져 변경이 어려워지고, 캡슐화를 깨뜨리는 문제가 발생한다(유지보수가 어려운 코드).
- 한 가지 이상의 부모클래스를 상속받을 수 없다(클래스는 오직 하나의 클래스만 상속할 수 있다).

## 조합(Composition)

- 상속의 문제점(높은 응집도: 부모 클래스의 구체적인 구현 내용을 알고 있어야 한다.)을 해결하기 위한 하나의 방법으로 조합(Composition)이 있다.
- 조합은 상속을 통해 부모 클래스의 메소드를 가져오는 것이 아니라, 부모 클래스 자체를 멤버로서 가지고 있는다.(?)
- 즉, 부모 클래스의 구체적인 구현 내용을 몰라도 해당 기능을 가져다 사용하는데 아무런 문제가 없다.

## 상속 vs 조합

- 상속은 높은 결합도, 조합은 느슨한 결합도: 상속을 하면 부모 클래스의 변경에 모든 자식 클래스들이 영향을 받게 되어 유연하지 못한 구조를 가지게 된다.
- 상속은 부모 클래스에 대한 높은 의존도, 조합은 낮은 의존도
- 상속은 컴파일 타임 의존성, 조합은 런타임 의존성이라 한다.
- 상속과 조합은 각각의 장단점이 있으므로 상황에 맞게 적용하여 사용하면 된다.

## 추상 클래스(Abstract Class)

- 추상 클래스는 해당 클래스를 상속 받을 자식 클래스의 세부 구현 사항에 대한 기능과 타입 등을 미리 지정해줄 수 있는 역할을 한다.
- abstract class에 선언되어 있는 abstract 메소드는 상속받은 자식 클래스에서 반드시 구현해야 한다.
- protected 키워드가 붙으면 해당 클래스를 상속 받은 자식 클래스에서만 접근이 가능한 method가 된다.
