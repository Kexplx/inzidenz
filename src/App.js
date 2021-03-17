import { Button, Divider, Row, Spin } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';
import GermanyDescription from './GermanyDescription';
import AlertDate from './AlertDate';
import CountyTable from './CountyTable';

function App() {
  const [counties, reloadCounties] = useCounties();
  const [germany, reloadGermany] = useGermany();

  return (
    <div className="container">
      <Row className="mt-2" align="bottom" style={{ marginBottom: '7px' }} justify="space-between">
        {germany === null ? <span></span> : <AlertDate date={germany.lastUpdated} />}
        <Button loading={germany === null} icon={<ReloadOutlined />} onClick={reloadGermany}>
          Deutschland
        </Button>
      </Row>
      {germany === null ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </div>
      ) : (
        <GermanyDescription germany={germany} />
      )}
      <Divider dashed></Divider>
      <Row align="bottom" style={{ marginBottom: '7px' }} justify="space-between">
        {counties === null ? <span></span> : <AlertDate date={counties[0].lastUpdated} />}
        <Button loading={counties === null} icon={<ReloadOutlined />} onClick={reloadCounties}>
          Städte & Landkreise
        </Button>
      </Row>
      {counties === null ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </div>
      ) : (
        <CountyTable counties={counties} />
      )}
    </div>
  );
}

export default App;
