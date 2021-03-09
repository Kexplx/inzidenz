import { Descriptions, Tag } from 'antd';

const GermanyDescription = ({ germany }) => {
  return (
    <Descriptions column={{ sm: 2, xs: 1 }} size="middle" bordered>
      <Descriptions.Item label="Neuinfektionen">{germany?.newCases}</Descriptions.Item>
      <Descriptions.Item label="7-Tage-Inzidenz">
        <Tag
          style={{ fontSize: '14px' }}
          color={
            germany?.inzidenz < 35
              ? 'green'
              : germany?.inzidenz < 50
              ? 'orange'
              : germany?.inzidenz < 100
              ? 'volcano'
              : 'red'
          }
        >
          {germany?.inzidenz}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Infektionen insgesamt">{germany?.cases}</Descriptions.Item>
      <Descriptions.Item label="Todes­fälle insgesamt">{germany?.deaths}</Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
