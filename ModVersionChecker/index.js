const http = require("http");
const fs = require("fs");
const request = require("request-promise-native");

const game = "valheim";
const category = "main";
let id = 232;

const api_key = "dDAwbjN1VVNKVHhzOWVUWVlPdmN6QlBpWUZtUUNPaWlDVDFNSGxsV2Fraz0tLTVFYzhkWDNmQVdEQVVISC9meEtKcEE9PQ==--fe6f666dfd0a88430686c6f17e7f8787a9d8f371";

main();

function main() {
  fs.readFile("Modpack.json", null, (err, data) => {
    let modpack = JSON.parse(data);
    Promise.all(modpack.ModList.map(handleModInfo)).then((res) => {
      let newModpack = JSON.parse(JSON.stringify(modpack));
      for (i in res) {
        let value = res[i];
        if (value.Skip != true) {
          let files = JSON.parse(value).files;
          let latest = files[files.length - 1];
          newModpack.ModList[i].NewestVersion = latest.version;
          newModpack.ModList[i].NexusId = getModId(newModpack.ModList[i].Url);
          newModpack.ModList[i].FileId = latest.file_id;
        } else {
          newModpack.ModList[i] = value;
        }
      }
      newModpack.ModList = newModpack.ModList.map(versionTest);
      modpack.ModList = newModpack.ModList.filter((mod) => {
        return !mod.UpToDate;
      });
      fs.writeFileSync("Modpack.json", JSON.stringify(newModpack, null, 2));
      fs.writeFileSync("ModsInNeedOfUpdate.json", JSON.stringify(modpack, null, 2));
      if (modpack.ModList.length == 0) {
        console.log("All mods are up to date.");
      }
      for (mod of modpack.ModList) {
        console.log(`${mod.Mod} has a possible update: ${mod.Version} => ${mod.NewestVersion}`);
      }
    });
  });
}

function versionTest(mod) {
  if (mod.Version == mod.NewestVersion) {
    mod.UpToDate = true;
    return mod;
  }
  mod.UpToDate = false;
  let currParts = mod.Version.split(".");
  let newParts = mod.NewestVersion.split(".");
  for (i in newParts) {
    if (newParts[i] != currParts[i]) {
      return mod;
    }
  }
  mod.UpToDate = true;
  return mod;
}

async function handleModInfo(modInfo) {
  if (modInfo.Skip == true) {
    return modInfo;
  }
  return request(getUrl(modInfo.Url), { headers: { apikey: api_key } });
}

function getUrl(modUrl) {
  let url = {
    base1: "https://api.nexusmods.com/v1/games/",
    game: "valheim",
    base2: "/mods/",
    id: getModId(modUrl),
    base3: "/files.json",
    category_base: "?category=",
    categroy: "main",
  };

  return Object.values(url).join("");
}

function getModId(modUrl) {
  let list = modUrl.split("/");
  return list[5];
}
