export interface User {
  email: string;
  password: string;
}

const users: User[] = [
  {
    email: "laithharb@hotmail.com",
    password: "123456789",
  },
];

module.exports = { users };
