const fs = require("fs");
const minify = require("strip-json-comments");

main();

function main() {
  let config_file = "LoottableGenerator/config.json";
  let rawdata = minify(String(fs.readFileSync(config_file)));
  let config = JSON.parse(rawdata);
  let loottable_inputFolder = "LoottableGenerator/input";
  let loottables_outputFolder = "LoottableGenerator/output";
  let files = fs.readdirSync(loottable_inputFolder);
  for(file of files){
    if(file.toLowerCase().indexOf(".json") != -1){
      let inputfile = loottable_inputFolder+"/"+file;
      let outputfile = loottables_outputFolder+"/"+file;
      handleFile(config,inputfile,outputfile);
    }
  }
  console.log("Loottables has been generated");
}

function handleFile(config, inputfile, outputfile){
  rawdata = minify(String(fs.readFileSync(inputfile)));
  let loottables = JSON.parse(rawdata);
  cleanItemSets(loottables.ItemSets);
  modifyLoottables(loottables, config);
  fs.writeFileSync(outputfile, JSON.stringify(loottables, null, 2));
}

function cleanItemSets(itemsets){
  for(set of itemsets){
    for(loot of set.Loot){
      delete loot.Rarity;
    }
  }
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
