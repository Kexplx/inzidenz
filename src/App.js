import { Card } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { parseRequest } from './parseRequest';
import axios from 'axios';

// We use `countyCount` to render placeholder cards below.
const [countyUrl, countyCount] = parseRequest();

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
      const { data } = await axios.get(countyUrl);

      setCounties(
        data.features.map(feature => ({
          id: feature.attributes.AdmUnitId,
          name: feature.attributes.GEN,
          lastUpdated: feature.attributes.last_update,
          casesPer100k: feature.attributes.cases7_per_100k,
          type: feature.attributes.BEZ,
          state: feature.attributes.BL,
          casesTotal: feature.attributes.cases,
          deathsTotal: feature.attributes.deaths,
        })),
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
      <Text type="secondary">
        Stand: {counties.length ? counties[0].lastUpdated : '00.00.0000, 00:00'}
        <br />
        Quelle:{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0"
        >
          RKI Datenhub
        </a>
      </Text>
      {counties.length ? (
        <>
          {counties.sort(compare).map(c => (
            <CountyCard
              key={c.id}
              county={c}
              isFavorite={favorites.includes(c.id)}
              onFavorite={handleFavorite}
            />
          ))}
        </>
      ) : (
        // Placeholder cards for the counties.
        Array(countyCount)
          .fill(null)
          .map((_, i) => <Card key={i} size="small" className="mt-2" loading></Card>)
      )}
    </div>
  );
}

export default App;
