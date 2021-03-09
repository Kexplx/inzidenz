import { Button, Row, Skeleton } from 'antd';
import CountyDescription from './CountyDescription';
import { useFavorites } from './useFavorites';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';
import GermanyDescription from './GermanyDescription';
import AlertDate from './AlertDate';

function App() {
  const [counties, reloadCounties] = useCounties();
  const [favorites, onFavorite] = useFavorites();
  const [germany, reloadGermany] = useGermany();

  return (
    <div className="container">
      <h1>COVID-19 Daten</h1>
      <Row className="m-2" justify="space-between">
        <h3>Deutschland insgesamt</h3>
        <Button onClick={reloadGermany}>Aktualisieren</Button>
      </Row>
      {germany === null ? (
        <Skeleton active paragraph={{ rows: 2, width: '100%' }} />
      ) : (
        <>
          <AlertDate date={germany.lastUpdated} />
          <GermanyDescription germany={germany} />
        </>
      )}

      <Row className="m-2" justify="space-between">
        <h3>Städte und Landkreise</h3>
        <Button onClick={reloadCounties}>Aktualisieren</Button>
      </Row>
      {counties === null ? (
        <Skeleton active paragraph={{ rows: 8, width: '100%' }} />
      ) : (
        <>
          <AlertDate date={counties[0].lastUpdated} />
          <CountyDescription counties={counties} onFavorite={onFavorite} favorites={favorites} />
        </>
      )}
    </div>
  );
}

export default App;
