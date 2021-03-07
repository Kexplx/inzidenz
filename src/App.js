import { Button, Card, Divider, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import CountyCard from './CountyCard';
import { useCounties } from './useCounties';
import { useFavorties } from './useFavorites';

function App() {
  const [counties, countiesCount, reloadCounties] = useCounties();
  const [favorites, handleFavorite] = useFavorties();

  const compare = (a, b) => a.inzidenz - b.inzidenz;

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
          {/* Favorite counties */}
          {counties
            .filter(c => favorites.includes(c.id))
            .sort(compare)
            .map(c => (
              <CountyCard
                key={c.id}
                county={c}
                isFavorite
                onFavorite={() => handleFavorite(c.id)}
              />
            ))}

          {favorites.length !== 0 && favorites.length < counties.length && <Divider></Divider>}

          {/* Unfavorited counties */}
          {counties
            .filter(c => !favorites.includes(c.id))
            .sort(compare)
            .map(c => (
              <CountyCard key={c.id} county={c} onFavorite={() => handleFavorite(c.id)} />
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
