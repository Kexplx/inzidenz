import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Row, Spin } from 'antd';
import { parseDate } from './helpers';
import bat from './assets/bat.jpg';
import useJokeOfTheDay from './useJokeOfTheDay';

const JokeOfTheDay = () => {
  const [joke, reloadJoke] = useJokeOfTheDay();
  return (
    <>
      <Row align="middle" className="mt-2" justify="space-between">
        <h2 style={{ margin: 0 }}>Joke of the day</h2>
        <Button onClick={reloadJoke} icon={<ReloadOutlined />} size="small">
          Aktualisieren
        </Button>
      </Row>
      <h3 style={{ color: 'gray', fontWeight: 400 }}>{parseDate(new Date(), false)}</h3>
      {joke ? (
        joke
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin indicator={<LoadingOutlined />} tip="Lade Daten" />
        </div>
      )}

      <Row justify="center">
        <img width="230px" src={bat} alt="A Bat" />
      </Row>
    </>
  );
};

export default JokeOfTheDay;
