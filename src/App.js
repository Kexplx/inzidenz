import { Button, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import CountyTable from './CountyTable';
import { useFavorites } from './useFavorites';
import { useCounties } from './useCounties';

function App() {
  const [counties, reloadCounties] = useCounties();
  const [favorites, onFavorite] = useFavorites();

  return (
    <div className="container">
      <h1>7-Tage-Inzidenz pro 100.000 Einwohner</h1>
      <Row justify="space-between" align="middle">
        <Text type="secondary">
          Stand: {counties.length ? counties[0].lastUpdated : '00.00.0000, 00:00 Uhr'}
          <br />
          Quelle: RKI-Datenhub
        </Text>
        <Button onClick={reloadCounties} disabled={!counties.length}>
          Aktualisieren
        </Button>
      </Row>
      <CountyTable counties={counties} onFavorite={onFavorite} favorites={favorites} />
    </div>
  );
}

export default App;
