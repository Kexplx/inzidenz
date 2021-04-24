import { Button, Drawer, Row, Spin } from 'antd';
import {
  AlertOutlined,
  HomeOutlined,
  LineChartOutlined,
  LoadingOutlined,
  ReloadOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useCounties } from './useCounties';
import { useGermany } from './useGermany';
import GermanyDescription from './GermanyDescription';
import AlertDate from './AlertDate';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CountyTable from './CountyTable';
import Chart from './Chart';
import { useState } from 'react';
import Text from 'antd/lib/typography/Text';
import useJokeOfTheDay from './useJokeOfTheDay';

function App() {
  const [counties, reloadCounties] = useCounties();
  const [germany, reloadGermany] = useGermany();
  const joke = useJokeOfTheDay();
  const [showNotbremseDrawer, setShowNotbremseDrawer] = useState(false);
  const [showJokeDrawer, setJokeShowDrawer] = useState(false);

  return (
    <div className="container">
      <Router basename="/inzidenz">
        <Route exact path="/">
          <div className="mt-2">
            <Link to="/history">
              <Button type="primary" size="small" icon={<LineChartOutlined />}>
                Historie
              </Button>
            </Link>
            <Button
              className="ml-1"
              onClick={() => setShowNotbremseDrawer(!showNotbremseDrawer)}
              type="dashed"
              danger
              size="small"
              icon={<AlertOutlined />}
            >
              Notbremse
            </Button>
            <Button
              className="ml-1"
              onClick={() => setJokeShowDrawer(!showJokeDrawer)}
              type="dashed"
              size="small"
              style={{ color: 'rgb(39,174,96)', borderColor: 'rgb(39,174,96)' }}
              icon={<SmileOutlined />}
            >
              Joke of the day
            </Button>
          </div>
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

          <Drawer
            style={{ margin: 0, padding: '-10px' }}
            placement="bottom"
            height="100%"
            closable={false}
            visible={showNotbremseDrawer}
          >
            <div style={{ textAlign: 'justify' }} className="container mt-2">
              <Button
                onClick={() => setShowNotbremseDrawer(false)}
                type="primary"
                icon={<HomeOutlined />}
                size="small"
              >
                Übersicht
              </Button>
              <h2 className="mt-2">§ 28b Infektionsschutzgesetz</h2>
              <h4>
                Überschreitet in einem Landkreis oder einer kreisfreien Stadt an drei aufeinander
                folgenden Tagen die 7-Tage-Inzidenz den Schwellenwert von 100, gelten die folgenden
                Maßnahmen.
              </h4>
              <ul>
                <li>
                  <Text strong>Ausgangsbeschränkungen: </Text>Ausgangsbeschränkung von 22 bis 5 Uhr
                  (Spaziergänge und Joggen alleine bleiben bis Mitternacht erlaubt).{' '}
                </li>

                <li>
                  <Text strong>Kontaktbeschränkungen: </Text>Im privaten und öffentlichen Raum darf
                  sich ein Haushalt mit höchstens einer weiteren Person treffen, wobei Kinder bis 14
                  Jahre ausgenommen sind.
                </li>

                <li>
                  <Text strong>Schulen und Kitas: </Text>Ab einer Sieben-Tage-Inzidenz von 165
                  sollen Schulen schließen und auf Distanzunterricht umstellen, bei dem die Schüler
                  mittels digitaler Lösungen zu Hause lernen. Kindertagesstätten müssen ab einer
                  7-Tage-Inzidenz von 165 in den Notbetrieb umschalten.
                </li>

                <li>
                  <Text strong>Einkaufen: </Text> Läden dürfen nur für Kunden öffnen, die einen
                  negativen Corona-Test vorlegen und einen Termin gebucht haben. Viele Geschäfte
                  müssen außerdem ab einer Inzidenz von 150 dichtmachen und dürfen dann nur noch das
                  Abholen bestellter Waren anbieten. Ausgenommen sind unter anderem Supermärkte,
                  Drogerien und Apotheken umschalten.
                </li>

                <li>
                  <Text strong>Kultur: </Text> Schließen müssen gemäß Notbremse Theater, Opern,
                  Konzerthäuser, Museen, Ausstellungen und Gedenkstätten.
                </li>
              </ul>
            </div>
          </Drawer>
          <Drawer
            style={{ margin: 0, padding: '-10px' }}
            placement="bottom"
            height="100%"
            closable={false}
            visible={showJokeDrawer}
          >
            <div style={{ textAlign: 'justify' }} className="container mt-2">
              <Button
                onClick={() => setJokeShowDrawer(false)}
                type="primary"
                icon={<HomeOutlined />}
                size="small"
              >
                Übersicht
              </Button>
              <h2 className="mt-2">Joke of the day</h2>
              {joke}
            </div>
          </Drawer>
        </Route>
        <Route path="/history" component={Chart} />
      </Router>
    </div>
  );
}

export default App;
