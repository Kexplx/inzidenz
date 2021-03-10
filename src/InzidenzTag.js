import { Tag } from 'antd';

const InizidenzTag = ({ inzidenz }) => {
  return (
    <Tag
      style={{ fontSize: '14px', fontWeight: 400 }}
      color={
        inzidenz < 35 ? 'green' : inzidenz < 50 ? 'orange' : inzidenz < 100 ? 'volcano' : 'red'
      }
    >
      {inzidenz.toFixed(2)}
    </Tag>
  );
};

export default InizidenzTag;
