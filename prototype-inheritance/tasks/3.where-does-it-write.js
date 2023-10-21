let animal = {
  eat() {
    this.full = true
  },
}

let rabbit = {
  __proto__: animal,
}

rabbit.eat()

// Q. If we call rabbit.eat(), which object receives the full property: animal or rabbit?
//* rabbit

console.log(rabbit.full)
console.log(animal.full)
