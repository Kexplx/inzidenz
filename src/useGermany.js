import axios from 'axios';
import { parse } from 'node-html-parser';
import { useEffect, useState } from 'react';

const rkiUrlWithProxy =
  'https://thingproxy.freeboard.io/fetch/https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Fallzahlen.html';

const newCasesSelector =
  '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(3) > strong';
const inzidenzSelector =
  '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(5) > strong';
const casesSelector =
  '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(2) > strong';
const deathsSelector =
  '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(6) > strong';
const lastUpdatedSelector = '#main > div.text > p:nth-child(4)';
const lastUpdatedRegex = /Stand: (.*) \(/;

function addPadding(text) {
  const boxes = text.split('.');
  const day = Number(boxes[0]) < 10 ? '0' + boxes[0] : boxes[0];
  const month = Number(boxes[1]) < 10 ? '0' + boxes[1] : boxes[1];

  return `${day}.${month}.${boxes[2]}`;
}

export function useGermany() {
  const [germany, setGermany] = useState(null);

  useEffect(() => fetchGermany(), []);

  const fetchGermany = async () => {
    setGermany(null);

    const { data } = await axios(rkiUrlWithProxy);
    const root = parse(data);

    const newCases = root.querySelector(newCasesSelector).textContent;
    const inzidenz = +root.querySelector(inzidenzSelector).textContent;
    const cases = root.querySelector(casesSelector).textContent;
    const deaths = root.querySelector(deathsSelector).textContent;

    const lastUpdatedUgly = root.querySelector(lastUpdatedSelector).textContent;
    const lastUpdated = addPadding(lastUpdatedRegex.exec(lastUpdatedUgly)[1]);

    setGermany({ newCases, inzidenz, cases, deaths, lastUpdated });
  };

  return [germany, fetchGermany];
}
