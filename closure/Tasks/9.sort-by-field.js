let users = [
  { name: 'John', age: 20, surname: 'Johnson' },
  { name: 'Pete', age: 18, surname: 'Peterson' },
  { name: 'Ann', age: 19, surname: 'Hathaway' },
]

// by name (Ann, John, Pete)
const usersByNameAsc = users.sort((a, b) => (a.name > b.name ? 1 : -1))
console.log(usersByNameAsc)

// by age (Pete, Ann, John)
const usersByAgeAsc = users.sort((a, b) => (a.age > b.age ? 1 : -1))
console.log(usersByAgeAsc)

const newUsersByNameAsc = users.sort(byField('name'))
console.log(newUsersByNameAsc)
const newUsersByAgeAsc = users.sort(byField('age'))
console.log(newUsersByAgeAsc)

//* write byField function
function byField(attribute) {
  return function (a, b) {
    return a[attribute] > b[attribute] ? 1 : -1
  }
}
