import { Button, Card, Divider, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { useCounties } from './useCounties';

function App() {
  const [counties, countiesCount, reloadCounties] = useCounties();
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

  const handleFavorite = (id, fav) => {
    if (!fav) {
      setFavorites(favorites.filter(i => i !== id));
      return;
    }

    setFavorites([...favorites, id]);
  };

  const compare = (a, b) => a.casesPer100k - b.casesPer100k;

  return (
    <div className="container">
      <h1>7-Tage-Inzidenz pro 100.000 Einwohner</h1>
      <Row justify="space-between" align="middle">
        <Text type="secondary">
          Stand: {counties.length ? counties[0].lastUpdated : '00.00.0000, 00:00 Uhr'}
          <br />
          Quelle: RKI-Datenhub
        </Text>
        <Button disabled={!counties.length} onClick={reloadCounties}>
          Aktualisieren
        </Button>
      </Row>
      {counties.length ? (
        <>
          {counties
            .filter(c => favorites.includes(c.id))
            .sort(compare)
            .map(c => (
              <CountyCard key={c.id} county={c} isFavorite onFavorite={handleFavorite} />
            ))}
          {favorites.length !== 0 && favorites.length < counties.length && <Divider></Divider>}
          {counties
            .filter(c => !favorites.includes(c.id))
            .sort(compare)
            .map(c => (
              <CountyCard key={c.id} county={c} isFavorite={false} onFavorite={handleFavorite} />
            ))}
        </>
      ) : (
        // Placeholder cards for the counties.
        Array(countiesCount)
          .fill()
          .map((_, i) => <Card key={i} size="small" className="mt-2" loading></Card>)
      )}
    </div>
  );
}

export default App;
