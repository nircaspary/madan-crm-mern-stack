import { useState, useEffect } from 'react';
import * as Http from '../models/Http';

export const useHttp = (url, ...rest) => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    (async () => {
      setIsPending(true);
      setData({});
      try {
        const res = await Http.get(url);
        if (res) {
          setIsPending(false);
          setData(res.data.data);
        }
      } catch (err) {
        if (err.response) {
          setIsPending(false);
          setErrors(err.response.data.message);
        }
      }
    })();
  }, [url]);

  return { data, isPending, errors };
};

export default useHttp;
