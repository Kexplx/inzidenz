import { ReloadOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { parseDate } from './helpers';
import bat from './assets/bat.jpg';
import useJokeOfTheDay from './useJokeOfTheDay';

const JokeOfTheDay = () => {
  const [joke, reloadJoke] = useJokeOfTheDay();
  return (
    <>
      <Row align="middle" className="mt-2" justify="space-between">
        <h2>Joke of the day</h2>
        <Button onClick={reloadJoke} icon={<ReloadOutlined />} size="small">
          Aktualisieren
        </Button>
      </Row>
      <h4>{parseDate(new Date(), false)}</h4>
      {joke}

      <Row justify="center">
        <img width="230px" src={bat} alt="A Bat" />
      </Row>
    </>
  );
};

export default JokeOfTheDay;
