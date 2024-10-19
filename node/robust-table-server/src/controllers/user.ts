import { Request, Response } from "express";
import {
  insertMany,
  getPaginated,
  getTotalCount,
  getAll,
} from "../models/user";
import { generateUsers } from "../../faker";
import { User } from "../types/user";
import { hasEmptyPagination } from "../types/pagiation";

const getUsers = async (req: Request, res: Response) => {
  try {
    if (hasEmptyPagination(req.query)) {
      const allUsers = await getAll();
      return res.json({ users: allUsers });
    }

    const { page, limit } = req.query;
    const parsedPage: number = parseInt(page);
    const parsedLimit: number = parseInt(limit);
    const skip: number = (parsedPage - 1) * parsedLimit;

    const users: User[] = await getPaginated({ skip, limit: parsedLimit });
    const totalCount: number = await getTotalCount();

    return res.json({
      users,
      currentPage: parsedPage,
      totalPages: Math.ceil(totalCount / parsedLimit),
      totalCount,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

const insertRandomUsers = async (req: Request, res: Response) => {
  try {
    const countToInsert: number =
      parseInt(req.query.count_to_insert as string) || 100;
    const users: User[] = generateUsers(countToInsert);
    const result = await insertMany(users);
    return res.json({ insertedCount: result.length });
  } catch (err) {
    console.error("Error inserting users:", err);
    return res.status(500).json({ error: "Failed to insert users" });
  }
};

export { insertRandomUsers, getUsers };
