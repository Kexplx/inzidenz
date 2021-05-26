import { Tag } from 'antd';

const InizidenzTag = ({ inzidenz }) => {
  return (
    <Tag
      style={{ fontSize: '13px' }}
      color={
        inzidenz < 45 ? 'green' : inzidenz < 75 ? 'orange' : inzidenz < 125 ? 'volcano' : 'red'
      }
    >
      {inzidenz.toFixed(2).toString().replace('.', ',')}
    </Tag>
  );
};

export default InizidenzTag;
