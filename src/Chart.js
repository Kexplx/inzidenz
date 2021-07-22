import { LoadingOutlined } from '@ant-design/icons';
import { Row, Select, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { XAxis, ResponsiveContainer, LineChart, Line, YAxis, ReferenceDot } from 'recharts';

const countiesHistoryUrl = 'https://valid-alpha-268602.ew.r.appspot.com/counties';

const Chart = () => {
  const [countiesHistory, setCountiesHistory] = useState(null);
  const [countiesChartData, setCountiesChartData] = useState(null);

  useEffect(() => {
    axios(countiesHistoryUrl).then(({ data }) => {
      setCountiesHistory(data);
      setCountiesChartData(mapToChartData(data['9362']).slice(-9));
    });
  }, []);

  const handleCountySelect = id => {
    const selectedHistory = countiesHistory[id];
    setCountiesChartData(mapToChartData(selectedHistory).slice(-9));
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
      <h4>Wo ist die Deutschland-Historie?</h4>
      <p>
        Das RKI aktualisiert die Corona Kennzahlen für ganz Deutschland seit Juli 2021 nur noch von
        Mo - Fr. Eine Deutschland-Historie mit täglichen Fallzahlen ist daher, ohne erhöhten
        Programmieraufwand meinerseits, aktuell nicht möglich. Sobald die dritte Welle anrollt und
        das RKI die Fallzahlen wieder täglich meldet, kommt auch die Deutschland-Historie zurück 😉
      </p>

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
