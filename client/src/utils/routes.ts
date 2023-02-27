import { roles } from "./roles";

export default [
  { name: "archive", link: "/", authorization: roles.affichage },
  // { name: "users", link: "/users", authorization: roles.admin },
];
