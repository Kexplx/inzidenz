import { Tag } from 'antd';

const InizidenzTag = ({ inzidenz }) => {
  return (
    <Tag
      style={{ fontSize: '14px' }}
      color={
        inzidenz < 35 ? 'green' : inzidenz < 50 ? 'orange' : inzidenz < 100 ? 'volcano' : 'red'
      }
    >
      {inzidenz.toFixed(0)}
    </Tag>
  );
};

export default InizidenzTag;
