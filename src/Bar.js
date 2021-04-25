import { AlertOutlined, HomeOutlined, LineChartOutlined, SmileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Bar = () => {
  const location = useLocation();

  return (
    <div className="mt-2">
      <Link to="/">
        <Button
          type={location.pathname === '/' ? 'primary' : 'dashed'}
          size="small"
          icon={<HomeOutlined />}
        >
          Übersicht
        </Button>
      </Link>
      <Link className="ml-1" to="/history">
        <Button
          type={location.pathname === '/history' ? 'primary' : 'dashed'}
          size="small"
          icon={<LineChartOutlined />}
        >
          Historie
        </Button>
      </Link>
      <Link className="ml-1" to="/joke-of-the-day">
        <Button
          type={location.pathname === '/joke-of-the-day' ? 'primary' : 'dashed'}
          size="small"
          icon={<SmileOutlined />}
        >
          Joke of the day
        </Button>
      </Link>
      <Link className="ml-1" to="/notbremse">
        <Button
          type={location.pathname === '/notbremse' ? 'primary' : 'dashed'}
          size="small"
          icon={<AlertOutlined />}
        >
          Notbremse
        </Button>
      </Link>
    </div>
  );
};

export default Bar;
