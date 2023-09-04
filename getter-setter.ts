class User {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// * 위와 같은 코드임
class UserDup1 {
  constructor(private firstName: string, private lastName: string) {}
}

// * getter and setter
class UserDup2 {
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  set setFirstName(newFirstName: string) {
    this.firstName = newFirstName;
  }
  set setLastName(newLastName: string) {
    this.lastName = newLastName;
  }
  constructor(private firstName: string, private lastName: string) {}
}
const user = new UserDup2('Haechan', 'Yang');
console.log(user.fullName);
user.setFirstName = 'TaeKyung'; // * set method를 통해 값을 수정할 수 있다.
console.log(user.fullName);
