import { constants } from "../constants";
import { User } from "../types/user";

export const fetchUsers = async (signal?: AbortSignal): Promise<User[]> => {
    const url: string = `${process.env.REACT_APP_API_URL}${constants.USERS_ENDPOINT}`
    const response = await fetch(url, { signal })
    return response.json();
};