import { LoadingOutlined } from '@ant-design/icons';
import { Row, Select, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { XAxis, ResponsiveContainer, LineChart, Line, YAxis, ReferenceDot } from 'recharts';
import { addDecimalPoint } from './helpers';

const germanyHistoryUrl = 'https://valid-alpha-268602.ew.r.appspot.com/germany-history';
const countiesHistoryUrl = 'https://valid-alpha-268602.ew.r.appspot.com/counties';

const Chart = () => {
  const [countiesHistory, setCountiesHistory] = useState(null);
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

  return (
    <>
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
              stroke="#7f8c8d"
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
              stroke="#7f8c8d"
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
                stroke="#7f8c8d"
                r={27}
                y={countiesChartData[1].inzidenz}
                x={countiesChartData[1].lastUpdated}
              />
            )}
            <Line
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              stroke="#7f8c8d"
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
    </>
  );
};

export default Chart;
