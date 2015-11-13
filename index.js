var prime = require('./primes')
for (var x = 1; x <= process.argv[2]; x++) {
  var answer = prime.testPrimes(x)
  console.log(x + ' : ' + answer)
}


// // TESTING SUMMATION
// var testSumsTotal = 0
// var testSums = []
// for (var x = 1; x <= process.argv[2]; x++) {
//   var answer = prime.testPrimes(x)
//   var sum = answer[0] + answer[1] + answer[2] + answer[3]
//   //test summation
//   if (sum != x) { 
//     testSumsTotal ++
//     testSums.push(x)
//   }
//   console.log(x + ' : ' + answer)
// }
// console.log('Invalid Sums: ' + testSumsTotal)
// console.log('Invalid Numbers: ' + testSums)