import { roles } from "./roles";
import { RiArticleLine } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import { BsArchive } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";

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
    name: "Pending articles",
    link: "/pendingarticles",
    authorization: roles.affichage,
    icon: <MdOutlinePendingActions />,
  },
  {
    key: 3,
    name: "users",
    link: "/users",
    authorization: roles.admin,
    icon: <TbUsers />,
  },
  {
    key: 4,
    name: "archive",
    link: "/archive",
    authorization: roles.admin,
    icon: <BsArchive />,
  },
] satisfies link[];
