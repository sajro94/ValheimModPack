const { Console } = require("console");
const fs = require("fs");
const minify = require("strip-json-comments");

let fuling = [0, 55, 40, 5];
let fenring = [64, 30, 6, 0];
let greyling = [100, 0, 0, 0];
let drops1 = [
  [0, 90],
  [1, 9],
  [2, 1],
];

//console.log(rarity_Gen(greyling, 1.15, 2, 5));

//console.log("Rarity Fuling");
//console.log(rarity(fuling, 1.15, 2, 5));

//console.log("Rarity Fenring");
//rarity(fenring, 1.1, 3, 5);

//console.log("Drops");
//console.log(drops(drops1, 5));

//Main
let filename_in = "LoottableGenerator/input_loottables.json";
let levels = 5;
let scale = 8;
let mod = 1.75;
let rawdata = fs.readFileSync(filename_in);
rawdata = minify(String(rawdata));

let loottables = JSON.parse(rawdata);
for (let object of loottables.LootTables) {
  //console.log(object.Object);
  let ObjectName = object.Object.toLowerCase();

  if (ObjectName.indexOf("chest") == -1) {
    let dropsArray = [];
    let raritArray = [];
    if (object["LeveledLoot"] != undefined) {
      let level1 = object["LeveledLoot"][0];
      dropsArray = drops_Gen(level1.Drops, levels);
      rarityArray = rarity_Gen(level1.Loot[0].Rarity, mod, scale, levels);
    } else {
      let drops = object.Drops;
      dropsArray = drops_Gen(drops, levels);
      let loot = object.Loot;
      rarityArray = rarity_Gen(loot[0].Rarity, mod, scale, levels);

      delete object["Drops"];
      delete object["Drops2"];
      delete object["Drops3"];
      delete object["Loot"];
      delete object["Loot2"];
      delete object["Loot3"];
      object.LeveledLoot = [];
      object.LeveledLoot[0] = {
        Level: 1,
        Drops: drops,
        Loot: loot,
      };
    }
    for (let i = 1; i < levels; i++) {
      let LootObject = [
        {
          Item: object.Object + ".1",
          Rarity: rarityArray[i],
        },
      ];
      object["LeveledLoot"][i] = {
        Level: i + 1,
        Drops: dropsArray[i],
        Loot: LootObject,
      };
    }
  }
}
fs.writeFileSync(
  "LoottableGenerator/loottables.json",
  JSON.stringify(loottables, null, 2)
);
console.log("Loottables has been generated");
//

function rarity_Gen(input_array, mod, scale, levels) {
  let result = [input_array];
  let array = Array(...input_array);
  for (let i = 1; i < levels; i++) {
    array = rarityCalcV2(array, mod, scale);
    result.push(array);
  }
  return result;
}

function rarityCalcV2(input_array, mod, scale) {
  let array = Array(...input_array);
  let oldVal = rarityValue(array, scale);
  let increase = oldVal * mod - oldVal;
  let steps = 0;
  for (const i in array) {
    if (i < 3) {
      let val = array[i];
      if (val > 0) {
        steps++;
      }
    }
  }

  let stepInc = increase / steps;
  let result = { overflow: 0 };
  for (let i = 0; i < 3; i++) {
    if ((array[i] > 0) & (steps > 0)) {
      result = stepIncrease(array, i, stepInc + result.overflow, scale);
      array = result.array;
      steps--;
    }
  }
  return array;
}

function stepIncrease(array, i, stepInc, scale) {
  let val1 = array[i];
  let val2 = array[i + 1];
  let scale1 = Math.pow(scale, i);
  let scale2 = scale1 * scale;
  let overflow = 0;
  let diff = scale2 - scale1;
  let increment = Math.floor(stepInc / diff);

  if (val1 >= increment) {
    val1 -= increment;
    val2 += increment;
  } else {
    overflow = stepInc - (scale2 - scale1) * val1;
    val2 += val1;
    val1 = 0;
  }
  array[i] = val1;
  array[i + 1] = val2;
  return { overflow, array };
}

function drops_Gen(level1Drops, maxLevel) {
  let result = [level1Drops];
  for (let i = 2; i <= maxLevel; i++) {
    let dropVal = dropValue(level1Drops);
    let newValue = dropVal * i;
    let dropArray = dropCalc(newValue);
    result.push(dropArray);
  }
  return result;
}

function rarityValue(array, scale) {
  let a = 1;
  let b = a * scale;
  let c = b * scale;
  let d = c * scale;
  let value = array[0] * a + array[1] * b + array[2] * c + array[3] * d;
  return value;
}

function dropValue(array) {
  let total = 0;
  for (const pair of array) {
    total += pair[0] * pair[1];
  }
  return total;
}

function dropCalc(value) {
  let array = [];
  let count = 0;
  while (value > 0) {
    let index = Math.ceil(value / (100 - count));
    if (!Number(array[index])) {
      array[index] = 0;
    }
    array[index]++;
    value -= index;
    count++;
  }
  array[0] = 100 - count;
  let result = [];
  let k = 0;
  for (const i in array) {
    let j = Number.parseInt(i);
    result[k] = [j, array[j]];
    k++;
  }
  return result;
}
