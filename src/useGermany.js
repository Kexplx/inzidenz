import axios from 'axios';
import { parse } from 'node-html-parser';
import { useEffect, useState } from 'react';
const impfdashboardUrl =
  'https://europe-west3-node02-307615.cloudfunctions.net/func-1?url=https://impfdashboard.de';
const rkiUrl = `https://europe-west3-node02-307615.cloudfunctions.net/func-1?url=https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Fallzahlen.html`;

const newCasesSelector =
  '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(3) > strong';
const inzidenzSelector = '#main > div.text > table > tbody > tr:nth-child(17) > td:nth-child(5)';
const lastUpdatedSelector = '#main > div.text > p:nth-child(4)';
const lastUpdatedRegex = /Stand: \D*\s?(\d.*) \(onlin/;

const vaccinatedTextSelector = '.text-summary';
const vaccinatedRegex = /Damit sind nun (.*) Personen \((.*%) der Gesamt/;
const firstTimesVacciantedRegex = /Insgesamt haben mindestens (.*) Personen \((.*%.?)\) eine/;
const latestVaccinedDayRegex = /(Am .* wurden in Deutschland .* Im)/;

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

    const { data: casesHtml } = await axios(rkiUrl);
    let root = parse(casesHtml);

    const newCases = root.querySelector(newCasesSelector).textContent.replace(',', '.');
    const inzidenz = +root.querySelector(inzidenzSelector).textContent.replace(',', '.');

    const lastUpdatedUgly = root.querySelector(lastUpdatedSelector).textContent;
    const lastUpdated = addPadding(lastUpdatedRegex.exec(lastUpdatedUgly)[1]);

    const { data: vaccinatedHtml } = await axios(impfdashboardUrl);
    root = parse(vaccinatedHtml);

    const text = root
      .querySelector(vaccinatedTextSelector)
      .textContent.replace(/(\n|\r)/g, '')
      .replace(/\s\s/g, ' ');
    let [, totalVaccinated, percentVaccinated] = vaccinatedRegex.exec(text);
    totalVaccinated = totalVaccinated.replace('mindestens', '').trim();
    percentVaccinated = percentVaccinated.replace(' ', '');
    let [, firstTimeVaccinated, firstTimeVaccinatedPercent] = firstTimesVacciantedRegex.exec(text);
    firstTimeVaccinatedPercent = firstTimeVaccinatedPercent.replace(' ', '');

    const [, latestVaccinedDay] = latestVaccinedDayRegex.exec(text);

    setGermany({
      newCases,
      firstTimeVaccinated,
      latestVaccinedDay,
      firstTimeVaccinatedPercent,
      inzidenz,
      lastUpdated,
      totalVaccinated,
      percentVaccinated,
    });
  };

  return [germany, fetchGermany];
}
