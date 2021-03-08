import axios from 'axios';
import { JSDOM } from 'jsdom';
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

export function useGermany() {
  const [germany, setGermany] = useState(null);

  useEffect(() => fetchGermany(), []);

  const fetchGermany = async () => {
    setGermany(null);

    const { data } = await axios(rkiUrlWithProxy);
    const dom = new JSDOM(data);

    const newCases = dom.window.document.body.querySelector(newCasesSelector).textContent;
    const inzidenz = +dom.window.document.body.querySelector(inzidenzSelector).textContent;
    const cases = dom.window.document.body.querySelector(casesSelector).textContent;
    const deaths = dom.window.document.body.querySelector(deathsSelector).textContent;

    console.log(newCases, inzidenz, cases, deaths);

    setGermany({ newCases, inzidenz, cases, deaths });
  };

  return [germany, fetchGermany];
}
