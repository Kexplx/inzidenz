let countyCodes = [9362, 9562, 9162, 9564, 9179, 9372, 9248, 9278];

// County codes can also be passed as query params in the url
const params = new URLSearchParams(window.location.search);

if (params.has('q')) {
  countyCodes = params
    .get('q')
    .split(',')
    .map(c => parseInt(c.trim()));
}

const q = countyCodes
  .reduce((acc, curr) => (acc += `admunitid:${curr} OR `), '')
  .replace(/ OR $/, ''); // Strip off trailing ' OR '

export const COUNTY_URL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=(${q})&rows=403&fields=cases7_per_100k,cases,name,bl,deaths,last_update,bez,admunitid`;
