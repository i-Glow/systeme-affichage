import { roles } from "./roles";
import { RiArticleLine } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import { BsArchive } from "react-icons/bs";

type link = {
  key: number;
  name: string;
  link: string;
  authorization: string;
  icon: JSX.Element;
};

export default [
  {
    key: 1,
    name: "articles",
    link: "/articles",
    authorization: roles.affichage,
    icon: <RiArticleLine />,
  },
  {
    key: 2,
    name: "users",
    link: "/users",
    authorization: roles.admin,
    icon: <TbUsers />,
  },
  {
    key: 2,
    name: "archive",
    link: "/archive",
    authorization: roles.admin,
    icon: <BsArchive />,
  },
] satisfies link[];
