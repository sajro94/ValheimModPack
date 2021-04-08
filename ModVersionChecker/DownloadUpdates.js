const fs = require("fs");
const https = require("https");
const del = require("del");
const request = require("request-promise-native");

const game = "valheim";
const category = "main";
let id = 232;

const api_key = "dDAwbjN1VVNKVHhzOWVUWVlPdmN6QlBpWUZtUUNPaWlDVDFNSGxsV2Fraz0tLTVFYzhkWDNmQVdEQVVISC9meEtKcEE9PQ==--fe6f666dfd0a88430686c6f17e7f8787a9d8f371";
const downloadFolder = "Mod Updates";
main();

function main() {
  fs.readFile("ModsInNeedOfUpdate.json", null, (err, res) => {
    if (fs.existsSync(downloadFolder)) {
      del(downloadFolder).then(() => {
        handleModUpdates(res);
      });
    } else {
      handleModUpdates(res);
    }
  });
}

function handleModUpdates(res) {
  let modUpdates = JSON.parse(res);
  let mods = modUpdates.ModList;
  for (mod of mods) {
    downloadFile(mod);
  }
}

function downloadFile(modInfo) {
  request(getUrl(modInfo.NexusId, modInfo.FileId), { headers: { apikey: api_key } }).then(
    (res) => {
      let downloadUrl = JSON.parse(res)[0].URI;
      let fileName = getFilename(downloadUrl);
      console.log(downloadUrl);

      if (!fs.existsSync(downloadFolder)) {
        fs.mkdirSync(downloadFolder);
      }
      const file = fs.createWriteStream(`${downloadFolder}\\${fileName}`);
      https.get(downloadUrl, (res) => {
        res.pipe(file);
      });
    },
    (err) => {
      console.log(err.message);
    }
  );
}

function getFilename(downloadUrl) {
  let noArgs = downloadUrl.split("?")[0];
  let parts = noArgs.split("/");
  let fileName = parts[parts.length - 1];
  return fileName;
}

function getUrl(NexusId, FileId) {
  let url = {
    base1: "https://api.nexusmods.com/v1/games/",
    game_domain_name: "valheim",
    base2: "/mods/",
    mod_id: NexusId,
    base3: "/files/",
    file_id: FileId,
    base4: "/download_link.json",
  };

  return Object.values(url).join("");
}
