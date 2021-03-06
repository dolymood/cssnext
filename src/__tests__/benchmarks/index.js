var cssnext = require("../")
var t = require("microtime")

var input = require("fs").readFileSync(
  "./src/__tests__/benchmarks.css",
  {encoding: "utf8"}
)

// make a 2MB input
for (var i = 0; i <= 10; i++) {
  input += input
}
// check the real input
// require("fs").writeFileSync("./src/__tests__/fixtures/bench.css", input)

// test each features
var keys = Object.keys(cssnext.features)
var allOff = {}

keys.forEach(function(k) {
  allOff[k] = false
})

console.log("Each features is tested on a 2MB input (>100 000 lines)\n")

keys.forEach(function(k) {
  var enable = {...allOff}
  enable[k] = true
  var start = t.now()
  cssnext(input, {features: enable})
  var stop = t.now()

  console.log(k + " takes " + ((stop - start) / 1000000) + "s") // , enable)
})
