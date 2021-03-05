let countyCodes = [9362, 9562, 9162, 9564, 9179, 9372, 9248, 9278];

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

export const COUNTY_URL = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=${filter}&outFields=GEN,BEZ,cases,deaths,BL,last_update,cases7_per_100k,AdmUnitId&returnGeometry=false&f=json`;
