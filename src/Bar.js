import { AlertOutlined, HomeOutlined, LineChartOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Bar = () => {
  const location = useLocation();

  return (
    <Row justify="space-between" className="mt-2 mb-2">
      <Link to="/">
        <Button
          type={location.pathname === '/' ? 'primary' : 'link'}
          size="small"
          icon={<HomeOutlined />}
        >
          Home
        </Button>
      </Link>
      <Link to="/history">
        <Button
          type={location.pathname === '/history' ? 'primary' : 'link'}
          size="small"
          icon={<LineChartOutlined />}
        >
          Historie
        </Button>
      </Link>
      <Link to="/joke-of-the-day">
        <Button
          type={location.pathname === '/joke-of-the-day' ? 'primary' : 'link'}
          size="small"
          icon={<SmileOutlined />}
        >
          Jokes
        </Button>
      </Link>
      <Link to="/notbremse">
        <Button
          type={location.pathname === '/notbremse' ? 'primary' : 'link'}
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
