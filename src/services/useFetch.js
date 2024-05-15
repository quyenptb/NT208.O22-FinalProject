import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        setTimeout(() => {
            axios.get(url, { cancelToken: source.token })
                .then(res => {
                    if (res.status !== 200) {
                        throw Error('Error fetching users data');
                    }
                    setData(res.data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        console.log('Request canceled', err.message);
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                });
        }, 1000);

        return () => source.cancel();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;
