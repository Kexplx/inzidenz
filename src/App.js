import { Alert, Button, Row, Spin } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';
import GermanyDescription from './GermanyDescription';
import AlertDate from './AlertDate';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CountyTable from './CountyTable';
import Chart from './Chart';
import JokeOfTheDay from './JokeOfTheDay';
import Bar from './Bar';

function redirectToV2() {
  window.location.href = 'https://kexplx.github.io/covid';
}

function App() {
  const [counties, reloadCounties] = useCounties();
  const [germany, reloadGermany] = useGermany();

  return (
    <div className="container">
      <Alert
        closable
        type="error"
        description={
          <>
            <h2>Neue Version verfügbar!</h2>
            Pünktlich zur vierten Welle haben wir eine neue Version dieser App entwickelt, mit
            diesen Features:
            <ul>
              <li>Kennzahlen für Bayern</li>
              <li>Kennzahlen für Deutschland an 7 Tagen die Woche</li>
              <li>8-Tage Deutschland Historie (sie ist zurück 😎)</li>
              <li>Kleineres Bundle (ca. 150 KB weniger zu downloaden) </li>
            </ul>
            <p>
              Außerdem haben wir unser Backend vollständig überarbeitet, wodurch die Ladeprobleme,
              die in der ersten Version häufig auftraten, behoben wurden.
            </p>
            <Button onClick={redirectToV2} type="primary">
              Zur neuen Version
            </Button>
          </>
        }
      ></Alert>
      <Router basename="/inzidenz">
        <Bar />
        <Route exact path="/">
          <Row
            className="mt-1"
            align="bottom"
            style={{ marginBottom: '8px' }}
            justify="space-between"
          >
            {germany === null ? <span></span> : <AlertDate date={germany.lastUpdated} />}
            <Button
              size="small"
              loading={germany === null}
              icon={<ReloadOutlined />}
              onClick={reloadGermany}
            >
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
            <Button
              size="small"
              loading={counties === null}
              icon={<ReloadOutlined />}
              onClick={reloadCounties}
            >
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
        </Route>
        <Route path="/history" component={Chart} />
        <Route path="/joke-of-the-day" component={JokeOfTheDay} />
      </Router>
    </div>
  );
}

export default App;
