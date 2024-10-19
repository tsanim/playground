import React, { useMemo } from "react";
import { getHighlighted } from "../../highlight-text";
import { User } from "../../types/user";
import { usePagination } from "../../hooks/use-pagination";
import { getPaginated } from "../../utils/pagination";
import Pagination from "../../pagination";

interface Props {
    users: User[];
    searchText?: string;
}

const PaginatedTable: React.FunctionComponent<Props> = ({ users, searchText = '' }) => {
    const { page, size, ...paginationControllers } = usePagination(users.length)
    const paginatedData = useMemo<User[]>(() => getPaginated<User>(users, { size, page }), [users, size, page])

    return <table>
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
                paginatedData.map(
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
        <tfoot>
            <Pagination page={page} size={size} {...paginationControllers} />
        </tfoot>
    </table>
}

export default React.memo(PaginatedTable)