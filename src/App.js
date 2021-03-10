import { Button, Divider, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
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
        <Button icon={<ReloadOutlined />} onClick={reloadGermany}>
          Deutschland
        </Button>
      </Divider>
      {germany === null ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin tip="Lade Daten..." />
        </div>
      ) : (
        <>
          <AlertDate date={germany.lastUpdated} />
          <GermanyDescription germany={germany} />
        </>
      )}

      <Divider orientation="right">
        <Button icon={<ReloadOutlined />} onClick={reloadCounties}>
          Städte & Landkreise
        </Button>
      </Divider>
      {counties === null ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin tip="Lade Daten..." />
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
