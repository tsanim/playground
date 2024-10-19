import { useReducer, useCallback, useEffect, useState } from 'react';

interface AsyncState<T> {
    loading: boolean;
    data: T | null;
    error: any;
}

type Action<T> =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: T }
    | { type: 'FETCH_FAILURE'; payload: any };

const asyncReducer = <T>(state: AsyncState<T>, action: Action<T>): AsyncState<T> => {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useAsyncReducer = <T>(
    asyncFunction: () => Promise<T>,
    options?: {
        onSuccess?: (data: T) => void;
        onError?: (error: any) => void;
    }
) => {
    const [state, dispatch] = useReducer(asyncReducer, {
        loading: false,
        data: null,
        error: null,
    });

    const { loading, data, error } = state;

    const execute = useCallback(async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
            const result = await asyncFunction();
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
            if (options?.onSuccess) {
                options.onSuccess(result);
            }
        } catch (err) {
            dispatch({ type: 'FETCH_FAILURE', payload: err });
            if (options?.onError) {
                options.onError(err);
            }
        }
    }, [asyncFunction, options]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { loading, error, data, refetch: execute };
};

export const useAsyncState = <T>(
    asyncFunction: (signal?: AbortSignal) => Promise<T>,
    options?: {
        onSuccess?: (data: T) => void;
        onError?: (error: any) => void;
    }
) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(async (signal: AbortSignal) => {
        setLoading(true)
        try {
            const result = await asyncFunction(signal);
            setData(result)
            setError(null)
            if (options?.onSuccess) {
                options.onSuccess(result);
            }
        } catch (err) {
            setError(err as Error)
            if (options?.onError) {
                options.onError(err);
            }
        } finally {
            setLoading(false)
        }
    }, [asyncFunction, options]);

    useEffect(() => {
        // create cancellable promise
        const { abort, signal } = new AbortController();
        execute(signal);

        return () => {
            abort()
        }
    }, [execute]);

    return { loading, error, data, refetch: execute };
};