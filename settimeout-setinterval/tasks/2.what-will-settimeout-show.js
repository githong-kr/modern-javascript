let i = 0

setTimeout(() => console.log(i), 100) // ?

// assume that the time to execute this function is >100ms
for (let j = 0; j < 100000000; j++) {
  i++
}

// answer : 100000000
// because the async event will run after the running code is finished.
// so after the loop, the variable, i is 100000000.
