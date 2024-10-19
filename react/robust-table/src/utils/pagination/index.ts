import { GetPaginated } from "../../types/pagination"

// WARNING: This has to be in the server
export const getPaginated: GetPaginated = (data, options = {}) => {
    const { size = 25, page = 1 } = options
    const end: number = page * size - 1
    const start: number = end - size + 1

    return data.slice(start, end + 1)
}