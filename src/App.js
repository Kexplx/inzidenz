import { Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { getGermanDateFormat } from './date-helpers';

const countyCodes = [9362, 9562, 9162, 9564, 9461, 9663, 9372];
const URL =
  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=($$$)&rows=403&fields=cases7_per_100k,cases,name,deaths,last_update,bez,admunitid';

function App() {
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
          ({ fields: { name, last_update, admunitid, cases7_per_100k, bez, deaths, cases } }) => ({
            id: admunitid,
            name,
            lastUpdated: last_update,
            casesPer100k: cases7_per_100k,
            type: bez,
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
          <Text type="secondary">
            Aktualisiert am: {getGermanDateFormat(new Date(counties[0].lastUpdated))}, Quelle: RKI
          </Text>
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
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default App;
