import bcryptjs from "bcryptjs";

const users = [
  {
    name: "DuyHung",
    email: "admib@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "ab",
    email: "admib@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
  {
    name: "ac",
    email: "admib@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
];

export default users;
