import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Alert, Row, Select, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XAxis, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

const germanyHistoryUrl =
  'https://europe-west3-crimeview.cloudfunctions.net/handleGet?url=http://35.225.234.174:5000/germany-history';
const countiesHistoryUrl =
  'https://europe-west3-crimeview.cloudfunctions.net/handleGet?url=http://35.225.234.174:5000/counties-history';

const Chart = () => {
  const [countiesHistory, setCountiesHistory] = useState(null);

  const [chartData, setChartData] = useState(null);
  const [germanyChartData, setGermanyChartData] = useState(null);
  const [showInzidenz, setShowInzidenz] = useState(true);

  useEffect(() => {
    axios(germanyHistoryUrl).then(({ data }) => {
      const sliceStart = data.length > 7 ? data.length - 6 : 0;
      setGermanyChartData(
        data
          .map(i => ({
            ...i,
            inzidenz: i.inzidenz.toFixed(0),
            lastUpdated: i.stand.replace('.2021, 00:00 Uhr', ''),
          }))
          .slice(sliceStart),
      );
    });

    axios(countiesHistoryUrl).then(({ data }) => {
      setCountiesHistory(data);
      setChartData(mapToChartData(data['9362']));
    });
  }, []);

  const handleSelect = id => {
    const selectedHistory = countiesHistory[id];
    setChartData(mapToChartData(selectedHistory));
  };

  const handleSelect2 = value => {
    const showInzidenz = value === 'inzidenz';

    setShowInzidenz(showInzidenz);
  };

  const mapToChartData = history => {
    const sliceStart = history.length > 7 ? history.length - 6 : 0;
    return history
      .map(c => ({
        ...c,
        inzidenz: c.inzidenz.toFixed(0),
        lastUpdated: c.lastUpdated.replace('.2021, 00:00 Uhr', ''),
      }))
      .slice(sliceStart);
  };

  return (
    <>
      <Alert closable message="🚧 Seite unter laufender Entwicklung 🚧" type="warning" />
      <div className="mt-2">
        <Link to="/">
          <ArrowLeftOutlined className="mr-1" />
          Zurück
        </Link>
      </div>
      <h2>COVID-19 Historie</h2>
      <Row justify="space-between">
        <h3>Deutschland</h3>
        {germanyChartData && (
          <Select onChange={handleSelect2} defaultValue="inzidenz">
            <Select.Option value="inzidenz">Inzidenz</Select.Option>
            <Select.Option value="newInfections">Neuinfektionen</Select.Option>
          </Select>
        )}
      </Row>
      {germanyChartData ? (
        <ResponsiveContainer aspect={2 / 1}>
          <BarChart
            margin={{
              top: 20,
            }}
            data={germanyChartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis fontSize={13} dataKey="lastUpdated" />
            <Bar
              isAnimationActive={false}
              fill="rgba(44, 62, 80, 0.6)"
              label={{ fontSize: 13, position: 'top', fill: 'rgb(102,102,102)' }}
              dataKey={showInzidenz ? 'inzidenz' : 'newCases'}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Row justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </Row>
      )}
      <Row justify="space-between">
        <h3>Städte & Landkreise</h3>
        {chartData && (
          <Select onChange={handleSelect} defaultValue={'9362'}>
            {Object.entries(countiesHistory).map(([a, b]) => (
              <Select.Option key={a} value={a}>
                {b[0].name} {b[0].type.includes('kreis') ? '(LK)' : ''}
              </Select.Option>
            ))}
          </Select>
        )}
      </Row>
      {chartData ? (
        <ResponsiveContainer aspect={2 / 1}>
          <BarChart margin={{ top: 20 }} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis fontSize={13} dataKey="lastUpdated" />
            <Bar
              isAnimationActive={false}
              label={{ fontSize: 13, position: 'top', fill: 'rgb(102,102,102)' }}
              fill="rgba(44, 62, 80, 0.6)"
              dataKey="inzidenz"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Row justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </Row>
      )}
    </>
  );
};

export default Chart;
