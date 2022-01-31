import fs from "fs-extra";

interface Configs {
  [id: number]: { title: string };
}

fs.emptyDirSync("output");

const raw = fs.readFileSync("info.json").toString();
const rawOld = fs.readFileSync("info_old.json").toString();
const info: Configs = JSON.parse(raw);
const oldInfo: Configs = JSON.parse(rawOld);

Object.entries(oldInfo).forEach(([before, { title }]) => {
  const result = Object.entries(info).find(
    ([_now, { title: _title }]) => _title === title
  );
  if (!result) throw new Error("bad input");
  const now = result[0];
  fs.renameSync(`input/${before}.json`, `output/${now}.json`);
});
