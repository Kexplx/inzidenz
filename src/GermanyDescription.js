import { Descriptions, Tag } from 'antd';

const GermanyDescription = ({ germany }) => {
  return (
    <Descriptions size="middle" bordered>
      <Descriptions.Item span={2} label="Neuinfektionen">
        {germany?.newCases}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="7-Tage-Inzidenz">
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
      <Descriptions.Item span={2} label="Infektionen insges.">
        {germany?.cases}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Todes­fälle insges.">
        {germany?.deaths}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GermanyDescription;
