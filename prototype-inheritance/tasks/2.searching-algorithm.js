let head = {
  glasses: 1,
}

let table = {
  pen: 3,
}

let bed = {
  sheet: 1,
  pillow: 2,
}

let pockets = {
  money: 2000,
}

// Q1. Use __proto__ to assign prototypes in a way that any property lookup will follow the path: pockets → bed → table → head.
// For instance, pockets.pen should be 3 (found in table), and bed.glasses should be 1 (found in head).

pockets.__proto__ = bed
bed.__proto__ = table
table.__proto__ = head

console.log(pockets.pen)
console.log(bed.glasses)

// Q2. Answer the question: is it faster to get glasses as pockets.glasses or head.glasses? Benchmark if needed.
//* In modern engines, performance-wise, there’s no difference
