import { Button, Row, Spin } from 'antd';
import { ArrowRightOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';
import GermanyDescription from './GermanyDescription';
import AlertDate from './AlertDate';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CountyTable from './CountyTable';
import Chart from './Chart';

function App() {
  const [counties, reloadCounties] = useCounties();
  const [germany, reloadGermany] = useGermany();

  return (
    <div className="container">
      <Router>
        <Route exact path="/">
          <Row
            className="mt-1"
            align="bottom"
            style={{ marginBottom: '8px' }}
            justify="space-between"
          >
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
          <Row
            className="mt-2"
            align="bottom"
            style={{ marginBottom: '8px' }}
            justify="space-between"
          >
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

          <Row className="mt-1" justify="end">
            <Link to="/history">
              <Button icon={<ArrowRightOutlined />} type="link">
                Historie
              </Button>
            </Link>
          </Row>
        </Route>
        <Route path="/history">
          <Chart />
        </Route>
      </Router>
    </div>
  );
}

export default App;
