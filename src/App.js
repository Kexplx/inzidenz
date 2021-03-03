import { Button, Divider, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { getGermanDateFormat } from './date-helpers';

let countyCodes = [9362, 9562, 9162, 9564, 9179, 9372, 9248, 9278];

// County codes can also be bassed in URL
// inzidenz?q=2919,91228,21992
const params = new URLSearchParams(window.location.search);

if (params.has('q')) {
  countyCodes = params
    .get('q')
    .split(',')
    .map(c => parseInt(c.trim()));
}

const URL =
  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=($$$)&rows=403&fields=cases7_per_100k,cases,name,bl,deaths,last_update,bez,admunitid';

function App() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [counties, setCounties] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage
  useEffect(() => {
    const favoritesJSON = localStorage.getItem('favorites');

    if (favoritesJSON) {
      setFavorites(JSON.parse(favoritesJSON));
    }
  }, []);

  // Save favorites to localstorage on unload
  window.onbeforeunload = () => localStorage.setItem('favorites', JSON.stringify(favorites));

  // Load counties from API
  useEffect(() => {
    async function fetchCounties() {
      const query = countyCodes
        .reduce((acc, curr) => (acc += `admunitid:${curr} OR `), '')
        .replace(/ OR $/, ''); // Strip off trailing ' OR '

      const responseJson = await fetch(URL.replace('$$$', query));
      const response = await responseJson.json();

      setCounties(
        response.records.map(
          ({
            fields: { name, last_update, admunitid, cases7_per_100k, bl, bez, deaths, cases },
          }) => ({
            id: admunitid,
            name,
            lastUpdated: last_update,
            casesPer100k: cases7_per_100k,
            type: bez,
            state: bl,
            casesTotal: cases,
            deathsTotal: deaths,
          }),
        ),
      );
    }

    fetchCounties();
  }, []);

  const handleFavorite = (id, fav) => {
    if (!fav) {
      setFavorites(favorites.filter(i => i !== id));
      return;
    }

    setFavorites([...favorites, id]);
  };

  const compare = (a, b) => {
    if (
      (favorites.includes(a.id) && favorites.includes(b.id)) ||
      (!favorites.includes(a.id) && !favorites.includes(b.id))
    ) {
      return 0;
    }

    if (favorites.includes(a.id)) {
      return -1;
    }

    return 1;
  };

  return (
    <div className="container">
      <h1>COVID-19 | 7-Tage-Inzidenz</h1>
      {counties.length ? (
        <>
          <Divider plain>
            <Text type="secondary">
              Stand: {getGermanDateFormat(new Date(counties[0].lastUpdated))}
            </Text>
          </Divider>
          {counties.sort(compare).map(c => (
            <CountyCard
              isFavorite={favorites.includes(c.id)}
              onFavorite={handleFavorite}
              key={c.id}
              county={c}
            />
          ))}
        </>
      ) : (
        <div className="spinner-container">
          <Spin tip="Daten werden geladen" size="large" />
        </div>
      )}

      <Divider>
        <Button onClick={() => setIsFaqOpen(true)} type="link">
          FAQ
        </Button>
      </Divider>

      <Modal visible={isFaqOpen} onCancel={() => setIsFaqOpen(false)} footer={''} title="FAQ">
        <div style={{ textAlign: 'justify' }}>
          <h4>Was ist die 7-Tage-Inzidenz?</h4>
          Die 7-Tage-Inzidenz ist eine wichtige Grundlage für die Einschätzung der Entwicklung der
          Corona-Pandemie. Der Wert bildet die COVID Fälle pro 100.000 Einwohner*innen in den
          letzten 7 Tagen ab.
        </div>
        <div style={{ textAlign: 'justify' }} className="mt-2">
          <h4>Woher stammen die Daten?</h4>
          Diese Anwendung verwendet eine API von{' '}
          <a href="https://public.opendatasoft.com/explore/dataset/covid-19-germany-landkreise/api/">
            opendatasoft
          </a>
          . Opendatasoft bezieht die Daten von dem offiziellen Datenhub des Robert-Koch-Instituts.
        </div>
        <div style={{ textAlign: 'justify' }} className="mt-2">
          <h4>Wo sind die anderen Landkreise?</h4>
          Sie können jeden Landkreis in Deutschland betrachten. Tragen Sie dazu den
          Gemeindeschlüssel des jeweiligen Landkreises in der URL ein und laden Sie die Seite neu.
          <br />
          <br />
          Mit der URL <Text code>https://kexplx.github.io/inzidenz?q=6412,5112</Text> werden bspw.
          die Daten für Frankfurt (6412) und Duisburg (5112) geladen. Beachten Sie die Trennung der
          Gemeindeschlüssel mit einem Komma!
        </div>
      </Modal>
    </div>
  );
}

export default App;
