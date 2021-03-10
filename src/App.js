import { Button, Divider, Skeleton } from 'antd';
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
        <Button type="dashed" icon={<ReloadOutlined />} onClick={reloadGermany}>
          Deutschland insgesamt
        </Button>
      </Divider>
      {germany === null ? (
        <Skeleton active paragraph={{ rows: 2, width: '100%' }} />
      ) : (
        <>
          <AlertDate date={germany.lastUpdated} />
          <GermanyDescription germany={germany} />
        </>
      )}

      <Divider orientation="right">
        <Button type="dashed" icon={<ReloadOutlined />} onClick={reloadCounties}>
          Städte & Landkreise
        </Button>
      </Divider>
      {counties === null ? (
        <Skeleton active paragraph={{ rows: 8, width: '100%' }} />
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
