import { Breadcrumb, Button } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DivSpaceBettwen, SvgPosition } from "./Style/Style";

type props = {
  page: string;
};

export default function PageHeader({ page }: props) {
  const navigate = useNavigate();

  return (
    <DivSpaceBettwen>
      <h3>{page}</h3>
      <Button
        type="default"
        onClick={() => {
          navigate("nouveau");
        }}
      >
        <SvgPosition>
          <AiOutlinePlusSquare />
        </SvgPosition>
        <span>Créer</span>
      </Button>
    </DivSpaceBettwen>
  );
}
