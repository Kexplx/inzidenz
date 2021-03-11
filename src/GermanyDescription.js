import { Descriptions } from 'antd';
import Text from 'antd/lib/typography/Text';
import InizidenzTag from './InzidenzTag';

const GermanyDescription = ({ germany }) => {
  const { newCases, inzidenz, totalVaccinated, percentVaccinated } = germany;

  return (
    <Descriptions column={{ sm: 3, xs: 1 }} size="middle" bordered>
      <Descriptions.Item
        style={{ padding: '10px' }}
        label={
          <div style={{ fontWeight: 500 }}>
            Neuinfektionen <Text type="secondary">(seit gestern)</Text>
          </div>
        }
      >
        <div style={{ textAlign: 'center' }}>{newCases}</div>
      </Descriptions.Item>
      <Descriptions.Item
        style={{ padding: '10px' }}
        label={<span style={{ fontWeight: 500 }}>7-Tage-Inzidenz</span>}
      >
        <div style={{ textAlign: 'center' }}>
          <InizidenzTag inzidenz={inzidenz} />
        </div>
      </Descriptions.Item>
      <Descriptions.Item
        style={{ padding: '10px' }}
        label={<span style={{ fontWeight: 500 }}>Vollständige Geimpfte</span>}
      >
        <div style={{ textAlign: 'center' }}>
          {totalVaccinated} ({percentVaccinated})
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
