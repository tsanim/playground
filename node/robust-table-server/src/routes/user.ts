import express from "express";
import { getUsers, insertRandomUsers } from "../controllers/user";

const router = express.Router();

router.post("/users", insertRandomUsers);
router.get("/users", getUsers);

export default router;
