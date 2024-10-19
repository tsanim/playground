import { useCallback, useEffect, useReducer } from "react";

interface InfinityScroll<T> {
    loadedData: T[];
    data: T[];
}

type Action<T> =
    | { type: 'LOAD_MORE' }
    | { type: 'RESET_DATA', payload: T[] }

const infinityScrollReducer = <T>(state: InfinityScroll<T>, action: Action<T>): InfinityScroll<T> => {
    switch (action.type) {
        case 'LOAD_MORE':
            const loadedDataIndex: number = state.loadedData.length
            const newData: T[] = [...state.loadedData, ...state.data.slice(loadedDataIndex, loadedDataIndex + 25)]
            return { ...state, loadedData: newData };
        case 'RESET_DATA':
            return { ...state, data: action.payload, loadedData: action.payload.slice(0, 100) };
        default:
            return state;
    }
};

interface UseInfinityScrollReturn<T> extends InfinityScroll<T> {
    loadMore: () => void;
}

export const useInfinityScroll = <T>(data: T[], initialLoad: number = 100): UseInfinityScrollReturn<T> => {
    const [state, dispatch] = useReducer<React.Reducer<InfinityScroll<T>, Action<T>>>(infinityScrollReducer, {
        loadedData: data.slice(0, initialLoad),
        data
    });

    const loadMore = useCallback(() => dispatch({ type: 'LOAD_MORE' }), [])

    // Effect to synchronize reducer state with data changes
    useEffect(() => {
        // TODO: Remove stringify comparison
        if (JSON.stringify(data) !== JSON.stringify(state.data)) {
            console.log('RESET DATA')
            dispatch({ type: 'RESET_DATA', payload: data });
        }
    }, [data, state.data]);

    return {
        ...state,
        loadMore
    };
};