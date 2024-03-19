import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    // Tutaj możesz dodać więcej konfiguracji, np. nagłówki
  });

  const fetchData = async ({ url, method = 'get', body = null }) => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        url,
        method,
        data: body,
        cancelToken: new axios.CancelToken(c => (cancel = c)),
      });
      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        if (process.env.NODE_ENV === 'debug') {
          console.log('Request canceled', err.message);
        }
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  let cancel;

  const cancelRequest = () => {
    if (cancel) cancel('Request was cancelled');
  };

  return { data, error, loading, fetchData, cancelRequest };
};

export default useAxios;