export interface User {
  email: string;
  password: string;
}

export interface Post {
  title: string;
  content: string;
}

const users: User[] = [
  {
    email: "laithharb@hotmail.com",
    password: "123456789",
  },
];

const publicPosts: Post[] = [
  {
    title: "Free Tips on Development",
    content: "These are some tips.",
  },
  {
    title: "Free Tips on Development",
    content: "These are some tips.",
  },
  {
    title: "Free Tips on Development",
    content: "These are some tips.",
  },
];

const privatePosts: Post[] = [
  {
    title: "Paid Tips on Development",
    content: "These are some tips.",
  },
  {
    title: "Paid Tips on Development",
    content: "These are some tips.",
  },
  {
    title: "Paid Tips on Development",
    content: "These are some tips.",
  },
];

module.exports = { users, publicPosts, privatePosts };
