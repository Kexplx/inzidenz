import Text from 'antd/lib/typography/Text';

const AlertDate = ({ date }) => {
  return (
    <div
      style={{
        marginBottom: '5px',
      }}
    >
      <Text type="secondary">Stand: {date}</Text>
    </div>
  );
};

export default AlertDate;
