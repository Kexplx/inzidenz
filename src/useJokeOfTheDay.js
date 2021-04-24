import { useEffect, useState } from 'react';
import axios from 'axios';

const jokeUrl = 'https://valid-alpha-268602.ew.r.appspot.com/joke-of-the-day';

const useJokeOfTheDay = () => {
  const [joke, setJoke] = useState(null);

  const fetchJoke = () => {
    setJoke(null);
    axios(jokeUrl).then(res => setJoke(res.data));
  };

  useEffect(() => fetchJoke(), []);

  return [joke, fetchJoke];
};

export default useJokeOfTheDay;
