import axios from 'axios';
import { useEffect, useState } from 'react';

const url =
  'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%C3%A4lle_in_den_Bundesl%C3%A4ndern/FeatureServer/0/query?where=1%3D1&outFields=Aktualisierung,cases7_bl_per_100k,AdmUnitId,Death,Fallzahl,LAN_ew_GEN,LAN_ew_BEZ&returnGeometry=false&outSR=4326&f=json';

export function useGermany() {
  const [germany, setGermany] = useState(null);

  useEffect(() => fetchGermany(), []);

  async function fetchGermany() {
    setGermany(null);

    const start = Date.now();
    const { data } = await axios(url);

    const states = data.features.map(({ attributes }) => ({
      id: attributes.AdmUnitId,
      lastUpdated: new Date(attributes.Aktualisierung),
      name: attributes.LAN_ew_GEN,
      deathsTotal: attributes.Death,
      casesTotal: attributes.Fallzahl,
      casesPer100k: attributes.cases7_bl_per_100k,
    }));

    const inzidenz = states.reduce((acc, curr) => (acc += curr.casesPer100k), 0) / states.length;
    const cases = states.reduce((acc, curr) => (acc += curr.casesTotal), 0);
    const deaths = states.reduce((acc, curr) => (acc += curr.deathsTotal), 0);

    // If the request takes less than 700ms, we add a fake delay.
    const fakeDelay = 600 - (Date.now() - start);
    setTimeout(() => setGermany({ inzidenz, cases, deaths }), fakeDelay);
  }

  return [germany, () => fetchGermany()];
}
