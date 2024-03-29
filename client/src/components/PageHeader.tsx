import { Breadcrumb, Button } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { DivSpaceBettwen, SvgPosition } from "./Style/Style";

type props = {
  page: string;
};

export default function PageHeader({ page }: props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <DivSpaceBettwen>
      <h3>{page}</h3>
      <Button
        type="primary"
        onClick={() => {
          navigate(`${pathname === "/" ? "articles/" : ""}nouveau`);
        }}
      >
        <SvgPosition>
          <AiOutlinePlusSquare />
        </SvgPosition>
        <span>New</span>
      </Button>
    </DivSpaceBettwen>
  );
}
