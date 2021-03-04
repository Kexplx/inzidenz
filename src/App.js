import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  InfoOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import { Button, Divider, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { formatDate } from './date-helpers';
import FaqDrawer from './FaqDrawer';

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
  const [isFaqVisible, setIsFaqVisible] = useState(false);
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
          <Text type="secondary">Stand: {formatDate(new Date(counties[0].lastUpdated))}</Text>
          {counties.sort(compare).map(c => (
            <CountyCard
              isFavorite={favorites.includes(c.id)}
              onFavorite={handleFavorite}
              key={c.id}
              county={c}
            />
          ))}
          <Divider>
            <Button onClick={() => setIsFaqVisible(true)}>FAQ</Button>
          </Divider>
        </>
      ) : (
        <div className="spinner-container">
          <Spin size="large" tip="Daten werden geladen" />
        </div>
      )}

      <FaqDrawer onClose={() => setIsFaqVisible(false)} isVisible={isFaqVisible} />
    </div>
  );
}

export default App;
