import { Button, Divider, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { COUNTY_URL } from './CountyUrl';
import { formatDate } from './date-helpers';
import FaqDrawer from './FaqDrawer';

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
      const responseJson = await fetch(COUNTY_URL);
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
    if (favorites.includes(a.id) && favorites.includes(b.id)) {
      return 0;
    }

    if (favorites.includes(a.id)) {
      return -1;
    }

    if (favorites.includes(b.id)) {
      return 1;
    }

    // If nothing is favorited we sort by casesPer100k ascending
    return a.casesPer100k - b.casesPer100k;
  };

  return (
    <div className="container">
      <h1>7-Tage-Inzidenz pro 100.000 Einwohner</h1>
      {counties.length ? (
        <>
          <Text type="secondary">
            Stand: {formatDate(new Date(counties[0].lastUpdated))}
            <br />
            Quelle: RKI
          </Text>
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
