import { Descriptions } from 'antd';
import InizidenzTag from './InzidenzTag';

const GermanyDescription = ({ germany }) => {
  const { newCases, inzidenz, cases, deaths } = germany;

  return (
    <Descriptions column={{ sm: 2, xs: 1 }} size="middle" bordered>
      <Descriptions.Item label="Neuinfektionen">{newCases}</Descriptions.Item>
      <Descriptions.Item label="7-Tage-Inzidenz">
        <InizidenzTag inzidenz={inzidenz} />
      </Descriptions.Item>
      <Descriptions.Item label="Infektionen insgesamt">{cases}</Descriptions.Item>
      <Descriptions.Item label="Todes­fälle insgesamt">{deaths}</Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
