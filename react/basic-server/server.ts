import express from "express";
import cors from "cors";
import mongoose, { Schema, Document } from "mongoose";
import { faker } from "@faker-js/faker";

// Define User interface extending Mongoose Document
interface User extends Document {
  id: number;
  name: string;
  email: string;
  dob: string;
  country: string;
  registrationDate: string;
}

// Mongoose schema for users
const UserSchema = new Schema<User>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  country: { type: String, required: true },
  registrationDate: { type: String, required: true },
});

// Mongoose model
const UserModel = mongoose.model<User>("User", UserSchema);

// MongoDB Connection URI
const mongoURI = "mongodb://localhost:27017/mydatabase"; // Replace with your MongoDB URI

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Function to generate mock user data
const generateUsers = (num: number): User[] => {
  const users: User[] = [];
  for (let i = 1; i <= num; i++) {
    users.push({
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      dob: faker.date
        .past({ years: 50, refDate: "2005-01-01" })
        .toISOString()
        .split("T")[0],
      country: faker.location.country(),
      registrationDate: faker.date
        .recent({ days: 365 })
        .toISOString()
        .split("T")[0],
    } as User);
  }
  return users;
};

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins

// Route to insert users into MongoDB
app.get("/api/insert-users", async (req, res) => {
  try {
    // Generate 100,000 users
    const users = generateUsers(100000);

    // Insert users into MongoDB using Mongoose
    const result = await UserModel.insertMany(users);
    res.json({ insertedCount: result.length });
  } catch (err) {
    console.error("Error inserting users:", err);
    res.status(500).json({ error: "Failed to insert users" });
  }
});

// Route to search and paginate users from MongoDB
app.get("/api/users", async (req, res) => {
  try {
    // Get pagination parameters from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the starting index for the pagination
    const skip = (page - 1) * limit;

    // Query MongoDB using Mongoose to get paginated users
    const users = await UserModel.find().skip(skip).limit(limit);

    // Count the total number of documents in the collection
    const totalUsers = await UserModel.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
