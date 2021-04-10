import { Tag } from 'antd';

const InizidenzTag = ({ inzidenz }) => {
  return (
    <Tag
      style={{ fontSize: '13px' }}
      color={
        inzidenz < 50 ? 'green' : inzidenz < 100 ? 'orange' : inzidenz < 150 ? 'volcano' : 'red'
      }
    >
      {inzidenz.toFixed(2).toString().replace('.', ',')}
    </Tag>
  );
};

export default InizidenzTag;
