import { Breadcrumb, Button } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DivSpaceBettwen, SvgPosition } from "./Style/Style";

export default function PageHeader() {
  const navigate = useNavigate();

  return (
    <DivSpaceBettwen>
      <Breadcrumb>
        {location.pathname.split("/").map((bc, key) => (
          <Breadcrumb.Item key={key}>{bc}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
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
