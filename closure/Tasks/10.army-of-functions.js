function makeArmy() {
  let shooters = []

  let i = 0
  while (i < 10) {
    let shooter = function () {
      // create a shooter function,
      console.log(i) // that should show its number
    }
    shooters.push(shooter) // and add it to the array
    i++
  }

  // ...and return the array of shooters
  return shooters
}

let army = makeArmy()

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0]() // 10 from the shooter number 0
army[1]() // 10 from the shooter number 1
army[2]() // 10 ...and so on.

//* why?
//? Because variable i is in the outer Lexical Environment

//* how could you fix it?
//? declare the variable has the value of variable i in the loop
//? use for loop or declare the new variable in the while loop
