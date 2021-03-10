import { Descriptions } from 'antd';
import Text from 'antd/lib/typography/Text';
import InizidenzTag from './InzidenzTag';

const GermanyDescription = ({ germany }) => {
  const { newCases, inzidenz } = germany;

  return (
    <Descriptions column={{ sm: 2, xs: 1 }} size="middle" bordered>
      <Descriptions.Item
        style={{ textAlign: 'center' }}
        label={
          <>
            Neuinfektionen <Text type="secondary">(seit gestern)</Text>
          </>
        }
      >
        {newCases}
      </Descriptions.Item>
      <Descriptions.Item style={{ textAlign: 'center' }} label="7-Tage-Inzidenz">
        <InizidenzTag inzidenz={inzidenz} />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
