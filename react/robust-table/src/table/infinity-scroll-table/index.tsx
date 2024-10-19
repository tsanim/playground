import React, { useEffect, useRef } from "react";
import { useIsAtBottom } from "../../hooks/use-is-at-bottom";
import { getHighlighted } from "../../highlight-text";
import { useDebounce } from "../../hooks/use-debounce";
import { User } from "../../types/user";
import { useInfinityScroll } from "../../hooks/use-infinity-scroll";

interface Props {
    users: User[];
    searchText?: string;
}

const InfinityScrollTable: React.FunctionComponent<Props> = ({ users, searchText = '' }) => {
    const { loadMore, loadedData } = useInfinityScroll<User>(users, 100)
    const tableWrapperRef = useRef<HTMLDivElement>(null)
    const isAtBottom = useIsAtBottom<HTMLDivElement>(tableWrapperRef)
    const debouncedIsAtBottom = useDebounce(isAtBottom, false, 200)

    useEffect(() => {
        debouncedIsAtBottom && loadMore()
    }, [debouncedIsAtBottom, loadMore])

    return <div ref={tableWrapperRef} className="tableWrapper">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>DoB</th>
                    <th>Country</th>
                    <th>Registration Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    loadedData.map(
                        ({ id, name, email, dob, country, registrationDate }) => {
                            return <tr key={id}>
                                <td>{id}</td>
                                <td>{getHighlighted(name, searchText)}</td>
                                <td>{getHighlighted(email, searchText)}</td>
                                <td>{dob}</td>
                                <td>{getHighlighted(country, searchText)}</td>
                                <td>{registrationDate}</td>
                            </tr>
                        })
                }
            </tbody>
        </table>
    </div>
}

export default React.memo(InfinityScrollTable)