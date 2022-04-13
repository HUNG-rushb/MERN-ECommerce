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
    email: "admdwqdqdqwdib@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
  {
    name: "ac",
    email: "addwdqwmib@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
];

export default users;
