import React, { useState } from "react";
import { Form, Input, DatePicker, Space, Button } from "antd";
import dayjs from "dayjs";

import NiveauCheckBox from "../components/CheckboxGroup";
import axios from "../api";
import { CheckboxValueType } from "antd/es/checkbox/Group";

export default function Home() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const [titre, setTitre] = useState("");
  const [text, setText] = useState("");
  const [niveau, setNiveau] = useState<CheckboxValueType[]>([]);

  return (
    <Form form={form} layout="vertical">
      {/*FIXME: show required icon */}
      <Form.Item label="titre" rules={[{ required: true }]} requiredMark={true}>
        <Input onChange={(e) => setTitre(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="contenu"
        rules={[{ required: true }]}
        requiredMark={true}
      >
        <Input.TextArea
          onChange={(e) => setText(e.target.value)}
          style={{ height: 120, resize: "none" }}
        />
      </Form.Item>
      <NiveauCheckBox checkedList={niveau} setCheckedList={setNiveau} />
      <DatePicker.RangePicker
        placeholder={["de", "a"]}
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [
            dayjs("00:00:00", "HH:mm:ss"),
            dayjs("11:59:59", "HH:mm:ss"),
          ],
        }}
        format="YYYY-MM-DD HH:mm:ss"
      />
      <Button
        loading={loading}
        onClick={() => setLoading(!loading)}
        type="primary"
      >
        Valider
      </Button>
    </Form>
  );
}