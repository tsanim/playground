import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  dob: string;
  country: string;
  registrationDate: string;
}

// Generate mock user data
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
    });
  }
  return users;
};

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins

// Route to get users
app.get("/api/users", (req, res) => {
  const users = generateUsers(100000); // Generate 100,000 users
  res.json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
