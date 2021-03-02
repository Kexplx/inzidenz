import { Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { getGermanDateFormat } from './date-helpers';

const countyCodes = [9362, 9562, 9162, 9564, 9461, 9663];
const URL =
  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=($$$)&rows=403&fields=cases7_per_100k,cases,name,deaths,last_update';

function App() {
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    async function fetchCounties() {
      const query = countyCodes
        .reduce((acc, curr) => (acc += `admunitid:${curr} OR `), '')
        .replace(/ OR $/, ''); // Strip off trailing ' OR '

      const responseJson = await fetch(URL.replace('$$$', query));
      const response = await responseJson.json();

      setCounties(
        response.records
          .map(({ fields: { name, last_update, cases7_per_100k, deaths, cases } }) => ({
            name,
            lastUpdated: last_update,
            casesPer100k: cases7_per_100k,
            casesTotal: cases,
            deathsTotal: deaths,
          }))
          .sort((a, _) => (a.name === 'Regensburg' ? -1 : 0)),
      );
    }

    fetchCounties();
  }, []);

  return (
    <div className="container">
      <h1>COVID-19 | 7-Tage-Inzidenz</h1>
      {counties.length ? (
        <>
          <Text type="secondary">
            Aktualisiert am: {getGermanDateFormat(new Date(counties[0].lastUpdated))}, Quelle: RKI
          </Text>
          {counties.map(c => (
            <CountyCard key={c.name} county={c} />
          ))}
        </>
      ) : (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default App;
