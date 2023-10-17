// Write a function printNumbers(from, to) that outputs a number every second, starting from from and ending with to.

printNumbers(3, 5) // 3 .. 4 .. 5

// setInterval
// function printNumbers(from, to) {
//   let number = from
//   let timerId = setInterval(() => {
//     console.log(number++)
//     if (number > to) {
//       clearInterval(timerId)
//     }
//   }, 1000)
// }

// setTimeout
function printNumbers(from, to) {
  let number = from
  let timerId = setTimeout(function print() {
    console.log(number++)

    timerId = setTimeout(print, 1000)

    if (number > to) {
      clearTimeout(timerId)
    }
  }, 1000)
}
