import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";

export default function RadioGroup() {
  const [nivea, setNivea] = useState("");

  const onChange = (e: RadioChangeEvent) => {
    setNivea(e.target.value);
  };
  console.log(nivea);
  return (
    <Radio.Group onChange={onChange} value={nivea}>
      <Space direction="vertical">
        <Radio value={"L1"}>L1</Radio>
        <Radio value={"L2"}>L2</Radio>
        <Radio value={"L3"}>L3</Radio>
        <Radio value={"M1"}>M1</Radio>
        <Radio value={"M2"}>M2</Radio>
        <Radio value={"D"}>D</Radio>
      </Space>
    </Radio.Group>
  );
}
