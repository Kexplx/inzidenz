import {
  HomeOutlined,
  LineChartOutlined,
  LoadingOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Row, Select, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XAxis, ResponsiveContainer, LineChart, Line, YAxis, ReferenceDot } from 'recharts';
import { addDecimalPoint, getCountyName } from './helpers';

const germanyHistoryUrl = 'https://valid-alpha-268602.ew.r.appspot.com//germany-history';
const countiesHistoryUrl = 'https://valid-alpha-268602.ew.r.appspot.com//counties';

const Chart = () => {
  const [countiesHistory, setCountiesHistory] = useState(null);

  const [showDrawer, setShowDrawer] = useState(false);
  const [countiesChartData, setCountiesChartData] = useState(null);
  const [germanyChartData, setGermanyChartData] = useState(null);
  const [showInzidenz, setShowInzidenz] = useState(false);

  useEffect(() => {
    axios(germanyHistoryUrl).then(({ data }) => {
      setGermanyChartData(mapToChartData(data).slice(-9));
    });

    axios(countiesHistoryUrl).then(({ data }) => {
      setCountiesHistory(data);
      setCountiesChartData(mapToChartData(data['9362']).slice(-9));
    });
  }, []);

  const handleCountySelect = id => {
    const selectedHistory = countiesHistory[id];
    setCountiesChartData(mapToChartData(selectedHistory).slice(-9));
  };

  const handleGermanyDataTypeSelect = value => {
    const showInzidenz = value === 'inzidenz';

    setShowInzidenz(showInzidenz);
  };

  const mapToChartData = history => {
    return history.map(c => ({
      ...c,
      newCases: Number(c.newCases?.replace('.', '')),
      inzidenz: c.inzidenz.toFixed(0),
      lastUpdated: c.lastUpdated.replace('.2021, 00:00 Uhr', ''),
    }));
  };

  const notbremseApplies = history => {
    if (
      history[history.length - 1].inzidenz >= 100 &&
      history[history.length - 2].inzidenz >= 100 &&
      history[history.length - 3].inzidenz >= 100
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="mt-2">
        <Link to="/">
          <Button type="primary" size="small" icon={<HomeOutlined />}>
            Übersicht
          </Button>
        </Link>
      </div>

      {germanyChartData && (
        <Row className="mt-1" align="middle" justify="space-between">
          <h4 className="m-0">Deutschland</h4>
          <Select size="small" onChange={handleGermanyDataTypeSelect} defaultValue="newInfections">
            <Select.Option value="newInfections">Neuinfektionen</Select.Option>
            <Select.Option value="inzidenz">Inzidenz</Select.Option>
          </Select>
        </Row>
      )}
      {germanyChartData ? (
        <ResponsiveContainer height={290}>
          <LineChart
            margin={{
              top: 10,
            }}
            data={germanyChartData}
          >
            <YAxis
              hide
              domain={
                showInzidenz
                  ? ['dataMin - 50', 'dataMax + 50']
                  : ['dataMin - 1000', 'dataMax + 2000']
              }
            />

            <XAxis fontSize={11} dataKey="lastUpdated" padding={{ left: 20, right: 20 }} />
            <Line
              stroke="#34495e"
              isAnimationActive={false}
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              label={{
                formatter: v => addDecimalPoint(v),
                fontSize: 11,
                offset: 10,
                position: 'top',
              }}
              dataKey={showInzidenz ? 'inzidenz' : 'newCases'}
            />
            <ReferenceDot
              stroke="#34495e"
              fill="transparent"
              strokeWidth={2}
              strokeDasharray="3 3"
              r={27}
              y={showInzidenz ? germanyChartData[1].inzidenz : germanyChartData[1].newCases}
              x={germanyChartData[1].lastUpdated}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Row className="mt-4" justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Historie" />
        </Row>
      )}
      {countiesChartData && (
        <Row align="middle" justify="space-between">
          <h4 className="m-0">
            Städte & Landkreise <Text type="secondary">(Inzidenz)</Text>
            {notbremseApplies(countiesChartData) && (
              <Button
                size="small"
                style={{ display: 'block' }}
                onClick={() => setShowDrawer(true)}
                icon={<WarningOutlined />}
                danger
                type="dashed"
              >
                Notbremse
              </Button>
            )}
          </h4>
          <Select size="small" onChange={handleCountySelect} defaultValue={'9362'}>
            {Object.entries(countiesHistory).map(([a, b]) => (
              <Select.Option key={a} value={a}>
                {b[0].name} {b[0].type.includes('kreis') ? '(LK)' : ''}
              </Select.Option>
            ))}
          </Select>
        </Row>
      )}
      {countiesChartData ? (
        <ResponsiveContainer height={290}>
          <LineChart margin={{ top: 10 }} data={countiesChartData}>
            <YAxis hide fontSize={11} domain={['dataMin - 60', 'dataMax + 100']} />
            <XAxis fontSize={11} dataKey="lastUpdated" padding={{ left: 20, right: 20 }} />
            {countiesChartData.length === 9 && (
              <ReferenceDot
                strokeWidth={2}
                strokeDasharray="3 3"
                stroke="#34495e"
                r={27}
                y={countiesChartData[1].inzidenz}
                x={countiesChartData[1].lastUpdated}
              />
            )}
            <Line
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              stroke="#34495e"
              isAnimationActive={false}
              label={{ fontSize: 11, position: 'top', offset: 10 }}
              name="Inzidenz"
              dataKey="inzidenz"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Row className="mt-20" justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Historie" />
        </Row>
      )}
      <Drawer
        style={{ margin: 0, padding: '-10px' }}
        placement="bottom"
        height="100%"
        closable={false}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
      >
        {countiesChartData && (
          <div style={{ textAlign: 'justify' }} className="container mt-2">
            <Link to="/">
              <Button
                onClick={() => setShowDrawer(false)}
                type="primary"
                size="small"
                icon={<HomeOutlined />}
              >
                Übersicht
              </Button>
            </Link>
            <Button
              className="ml-1"
              onClick={() => setShowDrawer(false)}
              type="primary"
              size="small"
              icon={<LineChartOutlined />}
            >
              Historie
            </Button>
            <h2>§ 28b Infektionsschutzgesetz</h2>
            <h4>
              Überschreitet in einem Landkreis oder einer kreisfreien Stadt an drei aufeinander
              folgenden Tagen die 7-Tage-Inzidenz den Schwellenwert von 100, gelten die folgenden
              Maßnahmen (
              {notbremseApplies(countiesChartData) ? (
                <Text type="danger">Gilt in {getCountyName(countiesChartData[0])}</Text>
              ) : (
                <Text type="success">Gilt nicht in {getCountyName(countiesChartData[0])}</Text>
              )}
              ).
            </h4>
            <ul>
              <li>
                Private Zusammenkünfte im öffentlichen oder privaten Raum sind nur noch zulässig,
                wenn an ihnen höchstens die Angehörigen eines Haushalts und eine weitere Person
                einschließlich der zu ihrem Haushalt gehörenden Kinder bis zur Vollendung des 14.
                Lebensjahres teilnehmen.
              </li>
              <li>
                Es gilt eine nächtliche Ausgangsbeschränkung in der Zeit von 21 Uhr bis 5 Uhr. Das
                Verlassen der Wohnung ist nur noch bei Vorliegen triftiger Gründe erlaubt.
                Kindertagesstätten und Schulen sind ab einer Inzidenz von 200 an drei
                aufeinanderfolgenden Tagen für den Präsenzbetrieb geschlossen. Ausnahmen sind
                insbesondere für Abschlussklassen vorgesehen.
              </li>
              <li>
                Der Betrieb von Wettannahmestellen, Museen, Galerien, zoologischen und botanischen
                Gärten sowie Gedenkstätten für den Publikumsverkehr bleibt insgesamt untersagt.
              </li>

              <li>
                Sport ist nur zulässig in Form von kontaktloser Ausübung von Individualsportarten,
                die allein, zu zweit oder mit den Angehörigen des eigenen Haushalts ausgeübt werden
                sowie bei Ausübung von Individual- und Mannschaftssportarten im Rahmen des
                Wettkampf- und Trainingsbetriebs des Spitzen- und Profisports.
              </li>

              <li>
                Körpernahe Dienstleistungen wie Kosmetik-, Nagel-, Massage-, Tattoo- und
                Piercingstudios sowie von kosmetischen Fußpflegeeinrichtungen und ähnlichen
                Einrichtungen sind mit Ausnahme von medizinisch notwendigen Behandlungen
                (insbesondere Physio- und Ergotherapie, Logopädie, Podologie und Fußpflege)
                geschlossen. Auch Sonnenstudios sind zu schließen.
              </li>
              <li>
                Für Kundinnen und Kunden von Friseurbetrieben und Barbershops ist ein vorheriger
                Schnelltest erforderlich.
              </li>
              <li>
                Der Betrieb von Musik-, Kunst- und Jugendkunstschulen ist nur im Rahmen des
                Onlineunterrichts zulässig.
              </li>
              <li>
                Ladengeschäfte dürfen keine Abholangebote mehr anbieten. Es sind nur noch
                Lieferdienste zulässig.
              </li>
              <li>
                Soweit Ladengeschäfte der Grundversorgung, also insbesondere aus dem
                Lebensmittelbereich, geöffnet bleiben, wird die Begrenzung der maximal zulässigen
                Verkaufsfläche pro Kundin oder Kunde nochmals verschärft von 10 auf 20 Quadratmeter
                (bei Ladenflächen bis 800 Quadratmeter) und von 20 auf 40 Quadratmeter (für die über
                800 Quadratmeter hinausgehenden Flächen).
              </li>
              <li>Baumärkte sind geschlossen.</li>
            </ul>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Chart;
