import { Button, Card, Col, Divider, Row, Statistic } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import CountyCard from './CountyCard';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';

function App() {
  const [favorites, setFavorites] = useState([]);

  const [counties, countiesLength, reloadCounties] = useCounties();
  const [germany, reloadGermany] = useGermany();

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
      <Row justify="space-between" align="middle">
        <Text type="secondary">
          Stand: {counties.length ? counties[0].lastUpdated : '00.00.0000, 00:00 Uhr'}
          <br />
          Quelle: RKI-Datenhub
        </Text>
        <Button
          disabled={!counties.length}
          onClick={() => {
            reloadCounties();
            reloadGermany();
          }}
          type="primary"
        >
          Aktualisieren
        </Button>
      </Row>
      {germany !== null ? (
        <Card className="mt-2" size="small" title="Deutschland">
          <Row gutter={8}>
            <Col span={8}>
              <Statistic
                decimalSeparator=","
                title="7-Tage-Inzidenz"
                valueStyle={{
                  color:
                    germany?.inzidenz < 35
                      ? '#27ae60'
                      : germany?.inzidenz < 50
                      ? '#f1c40f'
                      : germany?.inzidenz < 100
                      ? '#e67e22'
                      : '#c0392b',
                }}
                value={germany?.inzidenz}
                precision={2}
                groupSeparator="."
              />
            </Col>
            <Col span={8}>
              <Statistic groupSeparator="." title="Fälle insgesamt" value={germany?.cases} />
            </Col>
            <Col span={8}>
              <Statistic groupSeparator="." title="Tote insgesamt" value={germany?.deaths} />
            </Col>
          </Row>
        </Card>
      ) : (
        <Card size="small" className="mt-2" loading></Card>
      )}

      {counties.length ? (
        <>
          <Divider orientation="left">Landkreise</Divider>
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
        Array(countiesLength)
          .fill(null)
          .map((_, i) => <Card key={i} size="small" className="mt-2" loading></Card>)
      )}
    </div>
  );
}

export default App;
