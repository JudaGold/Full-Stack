"use strict";

// let fruit = "apple";
// if (fruit === "pear") console.log("the fruit is an apple");
// else console.log("the fruit is not an apple");

// console.log(120 + 12 + 12);

// const cities = ["ny", "b", "c"];
// console.log(cities);
// cities[0] = ["a"];
// console.log(cities);

// const testObj = {
//   user: "Juda",
//   age: 2,
//   currentYear: 2025,

//   birthYear: function () {
//     this.yearBorn = this.currentYear - this.age;
//   },

//   info: function () {
//     console.log(`
//         Hi my name is ${this.user} and i was born in ${this.yearBorn} which makes me ${this.age} years old. :)
//       `);
//   },
// };

// testObj.birthYear();

// console.log(testObj.yearBorn);
// testObj.info();

// for (let i = 0; i < 3; ++i) {
//   setTimeout(() => {
//     console.log(`${i}`);
//   }, 1000);
// }

const a = [1, 2, 3, 4, 5];
a.forEach( (a) => {
  console.log(a*2);
})

const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach((fruit, index, test) => {
  console.log(`Index: ${index}, Fruit: ${fruit}`);
  test[index] = fruit.toUpperCase();
});

console.log(fruits);

const second = a.map(a => {
  return a * 2;
})
console.log(second);

const _numbers = [1,2,3,4,5,6,[7,[8,9,[10]]]];
const flatNumbers = _numbers.flatMap(num => [num, num*2]);
console.log(flatNumbers);

const numbers = [10,2,86,4,5,6,7,8,9,1,3,11,12,13,14,15];
numbers.sort((a, b) => {
  return a + b; // Ascending order
});
console.log(numbers);
