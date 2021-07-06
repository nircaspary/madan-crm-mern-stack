import { useState, useEffect } from 'react';
import * as Http from '../models/Http';

export const useFetch = (url) => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const res = await Http.get(`${url}`);
        if (res) setTimeout(() => setIsPending(false), 1000);
        setData(data);
      } catch (err) {
        if (err) setTimeout(() => setIsPending(false), 1000);
        setError(err.response.data.message);
      }
    })();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
