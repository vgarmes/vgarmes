import fs from 'node:fs/promises';
import * as dotenv from 'dotenv';
import { TEMPLATE_FILEPATH, PLACEHOLDERS } from './constants';

dotenv.config();

async function getSteamData() {
  return fetch(process.env.STEAM_API).then((res) => res.json());
}

function generateSteamHTML({ title, imgSrc, link }) {
  <a href={link} target="_blank">
    <img src={`${imgSrc}`} alt={title} />
  </a>;
}

const [template, games] = await Promise.all([
  fs.readFile(TEMPLATE_FILEPATH, { encoding: 'utf-8' }),
  getSteamData(),
]);

const latestSteamGames = games.recentGames
  .map(({ title, imgSrc, link }) => generateSteamHTML(title, imgSrc, link))
  .join('');

const newMarkdown = template.replace(PLACEHOLDERS.STEAM, latestSteamGames);

await fs.writeFile('README.md', newMarkdown);
