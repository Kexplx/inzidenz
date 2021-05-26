import { Descriptions } from 'antd';
import Text from 'antd/lib/typography/Text';
import InizidenzTag from './InzidenzTag';

const GermanyDescription = ({ germany }) => {
  const {
    newCases,
    inzidenz,
    firstTimeVaccinated,
    totalVaccinated,
    percentVaccinated,
    firstTimeVaccinatedPercent,
  } = germany;

  return (
    <Descriptions column={1} size="small" bordered>
      <Descriptions.Item style={{ paddingLeft: '7px' }} label="Neuinfektionen">
        <div style={{ textAlign: 'center' }}>{newCases}</div>
      </Descriptions.Item>
      <Descriptions.Item style={{ paddingLeft: '7px' }} label="Inzidenz">
        <div style={{ textAlign: 'center' }}>
          <InizidenzTag inzidenz={inzidenz} />
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Erstgeimpfte" style={{ paddingLeft: '7px' }}>
        <div style={{ textAlign: 'center' }}>
          {firstTimeVaccinated} ({firstTimeVaccinatedPercent})
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Vollst. Geimpfte" style={{ paddingLeft: '7px' }}>
        <div style={{ textAlign: 'center' }}>
          {totalVaccinated} ({percentVaccinated})
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
