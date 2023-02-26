import { Collapse } from "antd";
import { Heading, Wrapper } from "./Style/LatestArticles.style";

export default function LatestArticles() {
  return (
    <Wrapper>
      <Heading>Article recement crees</Heading>
      <Collapse
        style={{ backgroundColor: "white" }}
        defaultActiveKey={["1"]}
        onChange={() => {}}
      >
        <Collapse.Panel header="This is panel header 1" key="1">
          <p>text</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" key="2">
          <p>text</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" key="3">
          <p>text</p>
        </Collapse.Panel>
      </Collapse>
    </Wrapper>
  );
}
