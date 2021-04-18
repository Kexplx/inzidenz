import { Descriptions } from 'antd';
import Text from 'antd/lib/typography/Text';
import InizidenzTag from './InzidenzTag';

const GermanyDescription = ({ germany }) => {
  const { newCases, inzidenz, firstTimeVaccinated, firstTimeVaccinatedPercent } = germany;

  return (
    <Descriptions column={1} size="small" bordered>
      <Descriptions.Item
        style={{ paddingLeft: '7px' }}
        label={
          <>
            Neuinfektionen <Text type="secondary">(seit gestern)</Text>
          </>
        }
      >
        <div style={{ textAlign: 'center' }}>{newCases}</div>
      </Descriptions.Item>
      <Descriptions.Item style={{ paddingLeft: '7px' }} label="Inzidenz">
        <div style={{ textAlign: 'center' }}>
          <InizidenzTag inzidenz={inzidenz} />
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Impfquote" style={{ paddingLeft: '7px' }}>
        <div style={{ textAlign: 'center' }}>
          Es haben{' '}
          <Text style={{ color: '#27ae60' }} strong>
            {firstTimeVaccinated} ({firstTimeVaccinatedPercent})
          </Text>{' '}
          Personen <Text strong>mindestens</Text> eine Impfodsis erhalten
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
