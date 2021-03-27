import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Row, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const germanyHistoryUrl =
  'https://europe-west3-crimeview.cloudfunctions.net/handleGet?url=http://34.107.5.136:5000/germany-history';
const countiesHistoryUrl =
  'https://europe-west3-crimeview.cloudfunctions.net/handleGet?url=http://34.107.5.136:5000/counties-history';

const Chart = () => {
  const [countiesHistory, setCountiesHistory] = useState(null);

  const [chartData, setChartData] = useState(null);
  const [germanyChartData, setGermanyChartData] = useState(null);

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
      {germanyChartData && (
        <>
          <h3>Deutschland</h3>
          <ResponsiveContainer className="mt-1" height="100" aspect={4 / 2}>
            <LineChart
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              data={germanyChartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis fontSize={13} dataKey="lastUpdated" />
              <YAxis fontSize={13} />
              <Line
                label={{ fontSize: 10, position: 'top', offset: 10 }}
                type="monotone"
                stroke="#8884d8"
                dataKey="inzidenz"
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
      {chartData && (
        <>
          <Row justify="space-between">
            <h3>Städte & Landkreise</h3>
            <Select
              style={{ width: '150px' }}
              onChange={handleSelect}
              defaultValue={'9362'}
              loading={countiesHistory === null}
            >
              {Object.entries(countiesHistory).map(([a, b]) => (
                <Select.Option key={a} value={a}>
                  {b[0].name}
                </Select.Option>
              ))}
            </Select>
          </Row>
          <ResponsiveContainer className="mt-1" width="100%" aspect={4 / 2}>
            <LineChart
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis fontSize={13} dataKey="lastUpdated" />
              <YAxis fontSize={13} />
              <Line
                label={{ fontSize: 10, position: 'top', offset: 10 }}
                type="monotone"
                stroke="#8884d8"
                dataKey="inzidenz"
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      <Link to="/" className="mr-1">
        <Button icon={<ArrowLeftOutlined />} type="link">
          Zurück
        </Button>
      </Link>
    </>
  );
};

export default Chart;
