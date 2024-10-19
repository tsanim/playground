import { faker } from '@faker-js/faker';

interface User {
    id: number;
    name: string;
    email: string;
    dob: string;
    country: string;
    registrationDate: string;
}

const generateUsers = (num: number): User[] => {
    const users: User[] = [];

    for (let i = 1; i <= num; i++) {
        users.push({
            id: i,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            dob: faker.date.past({ years: 50, refDate: '2005-01-01' }).toISOString().split('T')[0],
            country: faker.location.country(),
            registrationDate: faker.date.recent({ days: 365 }).toISOString().split('T')[0],
        });
    }

    return users;
}

// Generate 100,000 users
const mockData = generateUsers(100000);
console.log(mockData);
