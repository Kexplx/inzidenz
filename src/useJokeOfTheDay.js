import { useEffect, useState } from 'react';
import axios from 'axios';

const jokeUrl = 'https://valid-alpha-268602.ew.r.appspot.com/joke-of-the-day';

const useJokeOfTheDay = () => {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    axios(jokeUrl).then(res => setJoke(res.data));
  });

  return joke;
};

export default useJokeOfTheDay;
