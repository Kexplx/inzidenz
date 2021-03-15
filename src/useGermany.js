import axios from 'axios';
import { parse } from 'node-html-parser';
import { useEffect, useState } from 'react';
const vaccinationUrl = 'https://crimeview.ew.r.appspot.com?url=https://impfdashboard.de';
const rkiUrlWithProxy = `https://crimeview.ew.r.appspot.com?url=https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Fallzahlen.html`;

const newCasesSelector =
  '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(3) > strong';
const inzidenzSelector =
  '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(5) > strong';
const lastUpdatedSelector = '#main > div.text > p:nth-child(4)';
const lastUpdatedRegex = /Stand: (.*) \(/;

const vaccinatedTextSelector =
  'body > main > section > div.content.svelte-br2v7d.grow > div > div > div > div > div > div:nth-child(2) > p';
const vaccinatedRegex = /Damit sind nun (.*) Personen \((.*%)/;

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

    const start = Date.now();
    const { data: casesHtml } = await axios(rkiUrlWithProxy);
    let root = parse(casesHtml);

    const newCases = root.querySelector(newCasesSelector).textContent;
    const inzidenz = +root.querySelector(inzidenzSelector).textContent;

    const lastUpdatedUgly = root.querySelector(lastUpdatedSelector).textContent;
    const lastUpdated = addPadding(lastUpdatedRegex.exec(lastUpdatedUgly)[1]);

    const { data: vaccinatedHtml } = await axios(vaccinationUrl);
    root = parse(vaccinatedHtml);

    const text = root
      .querySelector(vaccinatedTextSelector)
      .textContent.replace(/(\n|\r)/g, '')
      .replace(/\s\s/g, ' ');
    const [, totalVaccinated, percentVaccinated] = vaccinatedRegex.exec(text);

    const fakeDelay = 400 - (Date.now() - start);

    setTimeout(
      () =>
        setGermany({
          newCases,
          inzidenz,
          lastUpdated,
          totalVaccinated,
          percentVaccinated,
        }),
      fakeDelay,
    );
  };

  return [germany, fetchGermany];
}
