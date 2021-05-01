import { AlertOutlined, HomeOutlined, LineChartOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Bar = () => {
  const location = useLocation();

  return (
    <Row justify="space-between" className="mt-2 mb-2">
      <Link to="/">
        <Button
          disabled={location.pathname === '/'}
          type="link"
          size="small"
          icon={<HomeOutlined />}
        >
          Home
        </Button>
      </Link>
      <Link to="/history">
        <Button
          disabled={location.pathname === '/history'}
          type="link"
          size="small"
          icon={<LineChartOutlined />}
        >
          Historie
        </Button>
      </Link>
      <Link to="/joke-of-the-day">
        <Button
          disabled={location.pathname === '/joke-of-the-day'}
          type="link"
          size="small"
          icon={<SmileOutlined />}
        >
          Jokes
        </Button>
      </Link>
      <Link to="/notbremse">
        <Button
          disabled={location.pathname === '/notbremse'}
          type="link"
          size="small"
          icon={<AlertOutlined />}
        >
          Notbremse
        </Button>
      </Link>
    </Row>
  );
};

export default Bar;
