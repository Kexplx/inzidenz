import { Alert } from 'antd';
import Text from 'antd/lib/typography/Text';

const AlertDate = ({ date, source }) => {
  return (
    <Alert
      style={{
        borderBottom: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
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
