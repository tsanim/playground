import { useCallback, useReducer } from "react";

interface Pagination {
  page: number;
  size: number;
  total: number;
}

type Action =
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "RESET_PAGE" }
  | { type: "SET_SIZE"; payload: number };

const paginationReducer = (state: Pagination, action: Action): Pagination => {
  switch (action.type) {
    case "NEXT_PAGE":
      const nextPage: number = state.page + 1;
      return nextPage * state.size > state.total
        ? { ...state }
        : { ...state, page: nextPage };
    case "PREV_PAGE":
      const prevPage: number = Math.max(1, state.page - 1);
      return { ...state, page: prevPage };
    case "RESET_PAGE":
      return { ...state, page: 1 };
    case "SET_SIZE":
      return { ...state, size: action.payload };
    default:
      return state;
  }
};

interface PaginationControllers extends Pagination {
  toNextPage: () => void;
  toPrevPage: () => void;
  setSize: (payload: number) => void;
  resetPage: () => void;
}

type UsePagination = (
  total: number,
  initialPage?: number,
  initialSize?: number
) => PaginationControllers;

// TODO: Fix bug with derived state from props
export const usePagination: UsePagination = (
  total,
  initialPage = 1,
  initialSize = 25
) => {
  const [state, dispatch] = useReducer(paginationReducer, {
    page: initialPage,
    size: initialSize,
    total,
  });

  const toNextPage = useCallback(() => dispatch({ type: "NEXT_PAGE" }), []);
  const toPrevPage = useCallback(() => dispatch({ type: "PREV_PAGE" }), []);
  const setSize = useCallback(
    (payload: number) => dispatch({ type: "SET_SIZE", payload }),
    []
  );
  const resetPage = useCallback(() => dispatch({ type: "RESET_PAGE" }), []);

  return {
    ...state,
    toNextPage,
    toPrevPage,
    setSize,
    resetPage,
  };
};
