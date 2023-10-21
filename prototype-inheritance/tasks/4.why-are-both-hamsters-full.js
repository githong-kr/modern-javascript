let hamster = {
  stomach: [],

  eat(food) {
    // this.stomach.push(food)
    this.stomach = [food]
  },
}

let speedy = {
  __proto__: hamster,
}

let lazy = {
  __proto__: hamster,
}

// This one found the food
speedy.eat('apple')

console.log(speedy.stomach) // apple

// This one also has it, why? fix please.
console.log(lazy.stomach) // apple

//* because if speedy.eat('apple) is called, javacript engine try to find this(=speedy).stomach property
//* but there is no stomach property in speedy.
//* so javacript engine try to find the stomach property in prototype(=hamster)
//* there it is! as the result, hamster.stomach.push('apple') is run
