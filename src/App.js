import { Alert, Button, Row, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import CountyTable from './CountyTable';
import { useFavorites } from './useFavorites';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';
import GermanyDescription from './GermanyDescription';

function App() {
  const [counties, reloadCounties] = useCounties();
  const [favorites, onFavorite] = useFavorites();
  const [germany, reloadGermany] = useGermany();

  return (
    <div className="container">
      <h1>COVID-19 Daten</h1>
      <Alert
        message={
          <>
            <Text>
              Stand: {counties !== null ? counties[0].lastUpdated : '00.00.0000, 00:00 Uhr'}
            </Text>
            <Text type="secondary"> (Quelle: RKI)</Text>
          </>
        }
        type="info"
      />

      <Row className="m-2" justify="space-between">
        <h3>Deutschland insgesamt</h3>
        <Button type="primary" onClick={reloadGermany}>
          Aktualisieren
          <Text style={{ marginLeft: '3px' }} type="secondary">
            (2.9 kB)
          </Text>
        </Button>
      </Row>
      {germany === null ? (
        <Row justify="center">
          <Spin tip="Lade Daten..."></Spin>
        </Row>
      ) : (
        <GermanyDescription germany={germany} />
      )}

      <Row className="m-2" justify="space-between">
        <h3>Städte und Landkreise</h3>
        <Button type="primary" onClick={reloadCounties}>
          Aktualisieren
          <Text style={{ marginLeft: '3px' }} type="secondary">
            (1.3 kB)
          </Text>
        </Button>
      </Row>
      {counties === null ? (
        <Row justify="center">
          <Spin tip="Lade Daten..."></Spin>
        </Row>
      ) : (
        <CountyTable counties={counties} onFavorite={onFavorite} favorites={favorites} />
      )}
    </div>
  );
}

export default App;
