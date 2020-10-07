/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

// Example:

console.log(
  between(10, 2000)
)
// 199 (this may vary for you :) )
