import axios from 'axios';
import { useEffect, useState } from 'react';

function getUrl() {
  let countyCodes = [9362, 9562, 9162, 9564, 9179, 9372, 9248, 9278, 9262];

  // County codes can also be passed as query params in the url
  const params = new URLSearchParams(window.location.search);

  if (params.has('q')) {
    countyCodes = params
      .get('q')
      .split(',')
      .map(c => parseInt(c.trim()));
  }

  const filter = countyCodes
    .reduce((acc, curr) => (acc += `admunitid=${curr} OR `), '')
    .replace(/ OR $/, ''); // Strip off trailing ' OR '

  const url = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=${filter}&outFields=GEN,BEZ,cases,deaths,last_update,cases7_per_100k,AdmUnitId&returnGeometry=false&f=json`;

  return url;
}

const url = getUrl();

export function useCounties() {
  const [counties, setCounties] = useState(null);

  useEffect(() => fetchCounties(), []);

  const fetchCounties = async () => {
    setCounties(null);
    const start = Date.now();
    const { data } = await axios(url);

    const mappedData = data.features.map(feature => ({
      id: feature.attributes.AdmUnitId,
      name: feature.attributes.GEN,
      lastUpdated: feature.attributes.last_update,
      inzidenz: feature.attributes.cases7_per_100k,
      type: feature.attributes.BEZ,
      state: feature.attributes.BL,
      cases: feature.attributes.cases,
      deaths: feature.attributes.deaths,
    }));

    const fakeDelay = 400 - (Date.now() - start);

    setTimeout(() => setCounties(mappedData), fakeDelay);
  };

  return [counties, fetchCounties];
}
