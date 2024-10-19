import { FunctionComponent, memo, useMemo, useState } from "react";
import './users.css'
import { User } from "../../types/user";
import { useAsyncState } from "../../hooks/use-async";
import { fetchUsers } from "../../services/user";
import { useDebounce } from "../../hooks/use-debounce";
import { filterByText } from "../../utils/filters/filter-by-text";
import SearchInput from '../../common/search'
import PaginatedTable from "../../table/paginated-table";
import InfinityScrollTable from "../../table/infinity-scroll-table";

// TODO: Add accessibility attributes
const UsersPage: FunctionComponent<{}> = () => {
    const { data = [], loading, error } = useAsyncState<User[]>(fetchUsers)
    const [searchText, setSearchText] = useState<string>('')
    const debouncedText: string = useDebounce(searchText, '', 500)
    const filteredData = useMemo<User[]>(() => filterByText<User>(data, debouncedText), [data, debouncedText])
    const [viewMode, setViewMode] = useState<'pagination' | 'infinityScroll'>('pagination');
    const showPaginationTable: boolean = useMemo(() => viewMode === 'pagination', [viewMode])

    const handleViewModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setViewMode(event.target.value as 'pagination' | 'infinityScroll');
    };

    // TODO: Make skeleton table for better UX
    if (loading) return <div className="loader">Loading...</div>

    // TODO: Add it to a snack bar
    if (error) return <div>Something went wrong... {error.message}</div>

    return <div className="page">
        <div className="view-mode-toggle">
            <label>
                <input
                    type="radio"
                    name="viewMode"
                    value="pagination"
                    checked={showPaginationTable}
                    onChange={handleViewModeChange}
                />
                Pagination Table
            </label>
            <label>
                <input
                    type="radio"
                    name="viewMode"
                    value="infinityScroll"
                    checked={!showPaginationTable}
                    onChange={handleViewModeChange}
                />
                Infinity Scroll Table
            </label>
        </div>
        <SearchInput value={searchText} onChange={setSearchText} />
        {showPaginationTable
            ? <PaginatedTable searchText={debouncedText} users={filteredData} />
            : <InfinityScrollTable searchText={debouncedText} users={filteredData} />
        }
    </div >
}

export default memo(UsersPage)