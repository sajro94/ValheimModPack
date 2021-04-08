const Subtractives = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

const Numerals = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

let Roman = /^(M{1,3})?(?:(CM)?(D)?|(D)?(C{0,3})?|(CD)?)?(?:(XC)?(L)?|(L)?(X{0,3})?|(XL)?)?(?:(IX)?(V)?|(V)?(I{0,3})?|(IV)?)?$/;

process.stdin.on("data", (data) => {
  roman(data.toString().trim());
});

function roman(input) {
  let array = Roman.exec(input);
  if (array == null) {
    console.log(`${input} is not a valid Roman Numeral`);
    return;
  }
  let part;
  let result = 0;
  for (i in array) {
    if (i > 0 && i < array.length) {
      part = array[i];
    } else {
      part = undefined;
    }
    if (part != undefined) {
      result += value(part);
    }
  }
  console.log(result);
}

function value(part) {
  let total = Subtractives[part];
  if (total == undefined) {
    let digits = part.split("");
    total = 0;
    for (digit of digits) {
      total += Numerals[digit];
    }
  }
  return total;
}
