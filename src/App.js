import { Button, Divider, Spin } from 'antd';
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
      <Divider orientation="right">
        <Button
          type="dashed"
          loading={germany === null}
          icon={<ReloadOutlined />}
          onClick={reloadGermany}
        >
          Deutschland
        </Button>
      </Divider>
      {germany === null ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </div>
      ) : (
        <>
          <AlertDate date={germany.lastUpdated} />
          <GermanyDescription germany={germany} />
        </>
      )}
      <Divider orientation="right">
        <Button
          type="dashed"
          loading={counties === null}
          icon={<ReloadOutlined />}
          onClick={reloadCounties}
        >
          Städte & Landkreise
        </Button>
      </Divider>
      {counties === null ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </div>
      ) : (
        <>
          <AlertDate date={counties[0].lastUpdated} />
          <CountyTable counties={counties} />
        </>
      )}
    </div>
  );
}

export default App;
