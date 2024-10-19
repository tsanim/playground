import { faker } from "@faker-js/faker";
import { User } from "./src/types/user";

const generateUsers = (num: number): User[] => {
  const users: User[] = [];
  for (let i = 1; i <= num; i++) {
    const nationalID = faker.string.numeric(10);
    users.push({
      id: nationalID,
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

export { generateUsers };
