import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const useFormStatus = () => {
    const [status, setStatus] = useState<FormStatus>('idle');

    const setIdle = () => setStatus('idle');
    const setLoading = () => setStatus('loading');
    const setSuccess = () => setStatus('success');
    const setError = () => setStatus('error');

    return {
        status,
        setIdle,
        setLoading,
        setSuccess,
        setError,
    };
};

export default useFormStatus;

