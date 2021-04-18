import { Descriptions } from 'antd';
import Text from 'antd/lib/typography/Text';
import InizidenzTag from './InzidenzTag';

const GermanyDescription = ({ germany }) => {
  const {
    newCases,
    inzidenz,
    latestVaccinedDay,
    firstTimeVaccinated,
    firstTimeVaccinatedPercent,
  } = germany;

  return (
    <Descriptions column={{ sm: 2, xs: 1 }} size="small" bordered>
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
      <Descriptions.Item label="Impfungen" style={{ paddingLeft: '7px' }}>
        {latestVaccinedDay} Insgesamt haben{' '}
        <Text strong type="success">
          {firstTimeVaccinated} ({firstTimeVaccinatedPercent})
        </Text>{' '}
        Personen mindestens eine Impf­dosis erhalten.
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
