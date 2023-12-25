import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface DataFetchingOptions extends AxiosRequestConfig {
    onSuccess: (data: any) => void;
    onError: (error: any) => void;
}

interface DataFetchingResult {
    loading: boolean;
    data: any;
    error: any;
}

const useFetchTasksByDate = (url: string, options: DataFetchingOptions): DataFetchingResult => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse = await axios(url, options);
                setData(response.data);
                options.onSuccess(response.data);
            } catch (error) {
                setError(error);
                options.onError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { loading, data, error };
};

export default useFetchTasksByDate;
