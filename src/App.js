import { Button, Row, Spin } from 'antd';
import CountyTable from './CountyTable';
import { useFavorites } from './useFavorites';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';
import GermanyDescription from './GermanyDescription';
import AlertDate from './AlertDate';
import { ReloadOutlined } from '@ant-design/icons';

function App() {
  const [counties, reloadCounties] = useCounties();
  const [favorites, onFavorite] = useFavorites();
  const [germany, reloadGermany] = useGermany();

  return (
    <div className="container">
      <h1>COVID-19 Daten</h1>
      <Row className="m-2" justify="space-between">
        <h3>Deutschland insgesamt</h3>
        <Button onClick={reloadGermany} shape="circle" icon={<ReloadOutlined />} />
      </Row>
      {germany === null ? (
        <Row justify="center">
          <Spin tip="Lade Daten..."></Spin>
        </Row>
      ) : (
        <>
          <AlertDate date={germany.lastUpdated} />
          <GermanyDescription germany={germany} />
        </>
      )}

      <Row className="m-2" justify="space-between">
        <h3>Städte und Landkreise</h3>
        <Button onClick={reloadCounties} shape="circle" icon={<ReloadOutlined />}></Button>
      </Row>
      {counties === null ? (
        <Row justify="center">
          <Spin tip="Lade Daten..."></Spin>
        </Row>
      ) : (
        <>
          <AlertDate date={counties[0].lastUpdated} />
          <CountyTable counties={counties} onFavorite={onFavorite} favorites={favorites} />
        </>
      )}
    </div>
  );
}

export default App;
