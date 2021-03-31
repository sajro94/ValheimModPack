const fs = require("fs");
const { createSecureServer } = require("http2");
const minify = require("strip-json-comments");

main();

function main() {
  let config_file = "LoottableGenerator/config.json";
  let loottable_inputFile = "LoottableGenerator/input_loottables.json";
  let loottables_outputFile = "LoottableGenerator/loottablesv2.json";
  let rawdata = minify(String(fs.readFileSync(config_file)));
  let config = JSON.parse(rawdata);
  rawdata = minify(String(fs.readFileSync(loottable_inputFile)));
  let loottables = JSON.parse(rawdata);
  modifyLoottables(loottables, config);
  fs.writeFileSync(loottables_outputFile, JSON.stringify(loottables, null, 2));
  console.log("Loottables has been generated");
}

function modifyLoottables(loottables, config) {
  let CreatureTables = loottables["LootTables"];
  for (creature of CreatureTables) {
    let name = creature.Object.toLowerCase();
    if (name.indexOf("chest") == -1) {
      if (creature.LeveledLoot == undefined) {
        creature.LeveledLoot = convertToLeveledLoot(creature);
      }
      creature.LeveledLoot = modifyLeveledLoot(creature.LeveledLoot, config, creature.Object);
      cleanup(creature);
    }
  }
}

function modifyLeveledLoot(leveledLoot, config, creatureName) {
  let currentLevel = leveledLoot.length;
  let maxLevel = config.Levels;
  if (currentLevel < maxLevel) {
    let tier = config.CreatureGroupings[creatureName];
    let rarities = config["Rarity Weights"][tier];
    let drops = config["Drops"][tier];
    for (let level = currentLevel + 1; level <= maxLevel; level++) {
      leveledLoot[level - 1] = createLootLevel(rarities[level - 1], drops[level - 1], currentLevel, creatureName, level);
    }
  }
  return leveledLoot;
}

function createLootLevel(rarity, drops, oldLevel, creatureName, newLevel) {
  let Item = creatureName + "." + oldLevel;
  let loot = [{ Item: Item, Weight: 1, Rarity: rarity }];
  let result = { Level: newLevel, Drops: drops, Loot: loot };
  return result;
}

function convertToLeveledLoot(creature) {
  let LeveledLoot = [];
  LeveledLoot[0] = {};
  LeveledLoot[0].Level = 1;
  LeveledLoot[0].Loot = creature.Loot;
  LeveledLoot[0].Drops = creature.Drops;
  if (creature.Loot2 != undefined && creature.Drops2 != undefined) {
    LeveledLoot[1] = {};
    LeveledLoot[1].Level = 2;
    LeveledLoot[1].Loot = creature.Loot2;
    LeveledLoot[1].Drops = creature.Drops2;
    if (creature.Loot3 != undefined && creature.Drops3 != undefined) {
      LeveledLoot[2] = {};
      LeveledLoot[2].Level = 3;
      LeveledLoot[2].Loot = creature.Loot3;
      LeveledLoot[2].Drops = creature.Drops3;
    }
  }
  return LeveledLoot;
}

function cleanup(creature) {
  for (key in creature) {
    switch (key) {
      case "LeveledLoot":
      case "Object":
        break;
      default:
        delete creature[key];
    }
  }
}
