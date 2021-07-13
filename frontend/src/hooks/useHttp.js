import { useState, useEffect } from 'react';
import * as Http from '../models/Http';

export const useHttp = (type, url, ...rest) => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [errors, setErrors] = useState([]);
  let http;
  switch (type) {
    case 'GET':
      http = Http.get(url);
      break;
    case 'POST':
      http = Http.post(url, rest.data);
      break;
    case 'PATCH':
      http = Http.patch(url, rest.data);
      break;
    case 'DELETE':
      http = Http.deleteItem(url);
      break;
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await http;
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
