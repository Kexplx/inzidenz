import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Row, Select, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XAxis, ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import { addDecimalPoint } from './helpers';

const germanyHistoryUrl = 'https://valid-alpha-268602.ew.r.appspot.com//germany-history';
const countiesHistoryUrl = 'https://valid-alpha-268602.ew.r.appspot.com//counties';

const Chart = () => {
  const [countiesHistory, setCountiesHistory] = useState(null);

  const [countiesChartData, setCountiesChartData] = useState(null);
  const [germanyChartData, setGermanyChartData] = useState(null);
  const [showInzidenz, setShowInzidenz] = useState(false);

  const getSlicedHistory = history => {
    return history.slice(-9);
  };

  useEffect(() => {
    axios(germanyHistoryUrl).then(({ data }) => {
      setGermanyChartData([
        ...data.map(i => ({
          ...i,
          newCases: Number(i.newCases.replace('.', '')),
          inzidenz: i.inzidenz.toFixed(0),
          lastUpdated: i.lastUpdated.replace('.2021, 00:00 Uhr', ''),
        })),
      ]);
    });

    axios(countiesHistoryUrl).then(({ data }) => {
      setCountiesHistory(data);
      setCountiesChartData(mapToChartData(data['9362']));
    });
  }, []);

  const handleSelect = id => {
    const selectedHistory = countiesHistory[id];
    setCountiesChartData(mapToChartData(selectedHistory));
  };

  const handleSelect2 = value => {
    const showInzidenz = value === 'inzidenz';

    setShowInzidenz(showInzidenz);
  };

  const mapToChartData = history => {
    return history.map(c => ({
      ...c,
      inzidenz: c.inzidenz.toFixed(0),
      lastUpdated: c.lastUpdated.replace('.2021, 00:00 Uhr', ''),
    }));
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
          <Select size="small" onChange={handleSelect2} defaultValue="newInfections">
            <Select.Option value="newInfections">Neuinfektionen</Select.Option>
            <Select.Option value="inzidenz">Inzidenz</Select.Option>
          </Select>
        </Row>
      )}
      {germanyChartData ? (
        <ResponsiveContainer height={300}>
          <LineChart
            margin={{
              top: 10,
            }}
            data={getSlicedHistory(germanyChartData)}
          >
            <YAxis
              fontSize={11}
              width={0}
              domain={
                showInzidenz
                  ? ['dataMin - 50', 'dataMax + 50']
                  : ['dataMin - 1000', 'dataMax + 2000']
              }
            />
            <XAxis fontSize={11} dataKey="lastUpdated" padding={{ left: 20, right: 20 }} />
            <Line
              stroke={showInzidenz ? '#8884d8' : '#82ca9d'}
              isAnimationActive={false}
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              type="monotone"
              label={{
                formatter: v => addDecimalPoint(v),
                fontSize: 11,
                offset: 8,
                position: 'top',
                fill: 'rgb(102,102,102)',
              }}
              dataKey={showInzidenz ? 'inzidenz' : 'newCases'}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Row justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </Row>
      )}
      {countiesChartData && (
        <Row align="bottom" justify="space-between">
          <h4 className="m-0">
            Städte & Landkreise <Text type="secondary">(Inzidenz)</Text>
          </h4>
          <Select size="small" onChange={handleSelect} defaultValue={'9362'}>
            {Object.entries(countiesHistory).map(([a, b]) => (
              <Select.Option key={a} value={a}>
                {b[0].name} {b[0].type.includes('kreis') ? '(LK)' : ''}
              </Select.Option>
            ))}
          </Select>
        </Row>
      )}
      {countiesChartData ? (
        <ResponsiveContainer height={300}>
          <LineChart margin={{ top: 10 }} data={getSlicedHistory(countiesChartData)}>
            <YAxis width={0} fontSize={11} domain={['dataMin - 50', 'dataMax + 50']} />
            <XAxis fontSize={11} dataKey="lastUpdated" padding={{ left: 20, right: 20 }} />
            <Line
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              type="monotone"
              stroke="#8884d8"
              isAnimationActive={false}
              label={{ fontSize: 11, position: 'top', offset: 8, fill: 'rgb(102,102,102)' }}
              name="Inzidenz"
              dataKey="inzidenz"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Row className="mt-4" justify="center">
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </Row>
      )}
    </>
  );
};

export default Chart;
