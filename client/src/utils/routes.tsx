import { roles } from "./roles";
import { RiArticleLine, RiSlideshow3Line } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import { BsArchive, BsGeoAlt } from "react-icons/bs";
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
    key: 0,
    name: "articles",
    link: "/articles",
    authorization: roles.affichage,
    icon: <RiArticleLine size={18} style={{ minWidth: "20px" }} />,
  },
  {
    key: 1,
    name: "pending articles",
    link: "/pendingarticles",
    authorization: roles.affichage,
    icon: <MdOutlinePendingActions size={18} style={{ minWidth: "20px" }} />,
  },
  {
    key: 2,
    name: "users",
    link: "/users",
    authorization: roles.admin,
    icon: <TbUsers size={18} style={{ minWidth: "20px" }} />,
  },
  {
    key: 2,
    name: "students",
    link: "/students",
    authorization: roles.affichage,
    icon: <TbUsers size={18} style={{ minWidth: "20px" }} />,
  },
  {
    key: 3,
    name: "archive",
    link: "/archive",
    authorization: roles.admin,
    icon: <BsArchive size={18} style={{ minWidth: "20px" }} />,
  },
  {
    key: 4,
    name: "slide show",
    link: "/affichage",
    authorization: roles.affichage,
    icon: <RiSlideshow3Line size={18} style={{ minWidth: "20px" }} />,
  },
  {
    key: 5,
    name: "geo guide",
    link: "/geo",
    authorization: roles.affichage,
    icon: <BsGeoAlt size={18} style={{ minWidth: "20px" }} />,
  },
] as link[];
