import fs from 'node:fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

const templateFilepath = './src/template.md';

async function getSteamData() {
  return fetch(process.env.STEAM_API).then((res) => res.json());
}

function generateSteamHTML() {}

const [template, games] = await Promise.all([
  fs.readFile(templateFilepath, { encoding: 'utf-8' }),
  getSteamData(),
]);

console.log(template);
