import { ChangeEvent, FunctionComponent, memo, useCallback } from "react";

interface Props {
    size: number;
    page: number;
    toNextPage: () => void;
    toPrevPage: () => void;
    resetPage: () => void;
    setSize: (size: number) => void;
}

const Pagination: FunctionComponent<Props> = ({ setSize, toNextPage, toPrevPage, resetPage, size, page }) => {
    const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        // refresh page if needed
        if (page > 1) resetPage()
        setSize(parseInt(e.target.value))
    }, [page, resetPage, setSize])

    return <div className="pagination">
        <button onClick={() => toPrevPage()}>&#8592;</button>
        <button onClick={() => toNextPage()}>&#8594;</button>
        <div>Page: {page}</div>
        <select onChange={handleSelectChange} value={size}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
        </select>
    </div>
}

export default memo(Pagination)