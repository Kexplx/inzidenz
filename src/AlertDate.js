import { Alert } from 'antd';
import Text from 'antd/lib/typography/Text';

const AlertDate = ({ date, source }) => {
  return (
    <Alert
      style={{
        marginBottom: '10px',
      }}
      message={
        <>
          <Text>Stand: {date}</Text>
          <Text type="secondary"> (Quelle: {source})</Text>
        </>
      }
      type="info"
    />
  );
};

export default AlertDate;
