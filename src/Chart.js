import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Row, Select, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const germanyHistoryUrl =
  'https://europe-west3-crimeview.cloudfunctions.net/handleGet?url=http://34.107.5.136:5000/germany-history';
const countiesHistoryUrl =
  'https://europe-west3-crimeview.cloudfunctions.net/handleGet?url=http://34.107.5.136:5000/counties-history';

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
            inzidenz: i.inzidenz.toFixed(2),
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
        name: 'Deutschland',
        inzidenz: c.inzidenz.toFixed(2),
        lastUpdated: c.lastUpdated.replace('.2021, 00:00 Uhr', ''),
      }))
      .slice(sliceStart);
  };

  return (
    <>
      <div className="mt-2">
        <Link to="/">
          <ArrowLeftOutlined className="mr-1" />
          Zurück
        </Link>
      </div>
      <h2>Historie</h2>
      <h3>Deutschland</h3>
      {germanyChartData ? (
        <>
          <Row className="mr-2" justify="end">
            <Select onChange={handleSelect2} defaultValue="inzidenz" style={{ width: '140px' }}>
              <Select.Option value="inzidenz">Inzidenz</Select.Option>
              <Select.Option value="newInfections">Neuinfektionen</Select.Option>
            </Select>
          </Row>
          <ResponsiveContainer aspect={2 / 1}>
            <LineChart
              margin={{
                top: 30,
                right: 20,
                left: 20,
              }}
              data={germanyChartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis fontSize={13} dataKey="lastUpdated" />
              <Line
                label={{ fontSize: 10, position: 'top', offset: 10 }}
                type="monotone"
                stroke="#8884d8"
                dataKey={showInzidenz ? 'inzidenz' : 'newCases'}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Row justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </Row>
      )}
      <h3>Städte & Landkreise</h3>
      {chartData ? (
        <>
          <Row className="mr-2" justify="end">
            <Select style={{ width: '150px' }} onChange={handleSelect} defaultValue={'9362'}>
              {Object.entries(countiesHistory).map(([a, b]) => (
                <Select.Option key={a} value={a}>
                  {b[0].name}
                </Select.Option>
              ))}
            </Select>
          </Row>
          <ResponsiveContainer aspect={2 / 1}>
            <LineChart
              margin={{
                top: 30,
                right: 20,
                left: 20,
              }}
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis fontSize={13} dataKey="lastUpdated" />
              <Line
                label={{ fontSize: 10, position: 'top', offset: 10 }}
                type="monotone"
                stroke="#8884d8"
                dataKey="inzidenz"
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Row justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </Row>
      )}
    </>
  );
};

export default Chart;
