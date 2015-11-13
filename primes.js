'use strict'

// take input and output four primes that total input, else print impossible

// primes up to 1000 [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]

var primes = getPrimes(process.argv[2])

/*
 * Sieve of Eratosthenes - memory is our limit here - this is not optimal for large numbers
 *
 * Input: an integer n > 1
 *
 * Let A be an array of Boolean values, indexed by integers 2 to n,
 * initially all set to true.
 * 
 * for i = 2, 3, 4, ..., not exceeding √n:
 *   if A[i] is true:
 *     for j = i2, i2+i, i2+2i, i2+3i, ..., not exceeding n :
 *       A[j] := false
 *
 * Output: all i such that A[i] is true.
*/

function getPrimes(max) {
  var sieve = [] // composites
    , primes = []
    , i
    , j
  for (i = 2; i <= max; i++) {
    if (!sieve[i]) {
      // if i has not been marked we know it to be prime
      primes.push(i)
      // remove divisible 2 because prime
      for (j = i * 2; j <= max; j += i) {
        sieve[j] = true
      }
    }
  }
  return primes
}

// now that we have primes use the list to check input
// we need four primes to equal input
// would it make sense to chunk the primes into multiple arrays?
// according Goldbach's Conjecture the smallest number that works is 8
// 8 <= N <= 10000000

// binary search. vastly improves performance.
function binaryIndexOf(searchElement, arr) {
    var minIndex = 0
      , maxIndex = arr.length - 1
      , currentIndex
      , currentElement
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0
        currentElement = arr[currentIndex]
 
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1
        }
        else return currentIndex
    }
    return -1
}

function testPrimes(x) {
  function findNextLowestPrime() {
    var notFound = true
    while (notFound) {
      if (binaryIndexOf(count, primes) == -1) count --
      // make sure slot three is prime
      else if (binaryIndexOf(x - count - answer[1] - answer[0], primes) == -1) {
        count --
        findNextLowestPrime()
      }
      else {
        // set answers
        answer[3] = count
        answer[2] = x - answer[3] - answer[1] - answer[0]
        notFound = false // end loop
      }
    }
  }

  var answer = []
  var count
  // only numbers less than 8 are impossible
  if (x < 8) {
    answer = "IMPOSSIBLE"
    return answer
  }
  if (x % 2 === 0) { // even
    // originally 4, had cases of 1.
    // Example: 88 returns 2 2 1 83, because 88 - 4 or 5 still finds 83
    // changing to 5 improved, but 6 eliminated all
    // this is a cheating way to ensure our we have at leasat 2 2 2 x
    count = x - 6
    answer.push(2)
    answer.push(2)
  }
  else { // odd
    // originally 5, had cases of 1.
    // Add Example:
    // changing to 6 improved, but 7 eliminated all
    // this is a cheating way to ensure our we have at leasat 2 3 2 x
    count = x - 7
    answer.push(2)
    answer.push(3)
  }
  findNextLowestPrime()
  return answer
}

module.exports = {
  testPrimes: testPrimes
}

// steps for optimization:
// break up primes into multiple arrays
// build primes array as we go
// use str.lastIndexOf when appropriate
// there is a pattern in the last number
// cache previous answer and try that
// next answer is always the same, just changing slot two
// cache array of common third slots and iterate those first






