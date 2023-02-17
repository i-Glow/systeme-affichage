import { useState } from "react";
import { Input, DatePicker, Button, message } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs from "dayjs";

import { Form, Wrapper } from "./CreateArticles.styles";
import NiveauCheckBox from "../components/CheckboxGroup";
import axios from "../api";

type data = {
  titre: string;
  contenu: string;
  date_debut: string;
  date_fin: string;
  niveau: string[];
  category_id: number;
};

export default function CreateArticle() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const [titre, setTitre] = useState<string>("");
  const [contenu, setContenu] = useState<string>("");
  const [niveau, setNiveau] = useState<CheckboxValueType[]>([]);
  const [dateDebut, setDateDebut] = useState<string>();
  const [dateFin, setDateFin] = useState<string>();

  function dateChangeHandler(value: any) {
    setDateDebut(value[0].$d.toISOString());
    setDateFin(value[1].$d.toISOString());
  }

  async function onFinish() {
    setLoading(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub20iOiJ1c2VyMSIsInByZW5vbSI6ImFmZjEiLCJpYXQiOjE2NzY2NDc0NDMsImV4cCI6MTY3NjY3NjI0M30.bZe4hglR2IBJPPHCC23agVZaNYUq1RthSAFgGVlqBQA";

    try {
      if (!dateDebut || !dateFin) {
        return;
      }

      const data: data = {
        titre,
        contenu,
        date_debut: dateDebut,
        date_fin: dateFin,
        niveau: niveau as string[],
        category_id: 1,
      };

      const res = await axios.post("/articles", data, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Article créé",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Erreur",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Form
        form={form}
        labelAlign={"left"}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        {contextHolder}
        <Form.Item
          label="titre"
          rules={[{ required: true }]}
          requiredMark={true}
        >
          <Input required onChange={(e) => setTitre(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="contenu"
          rules={[{ required: true }]}
          requiredMark={true}
        >
          <Input.TextArea
            required
            onChange={(e) => setContenu(e.target.value)}
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>
        <Form.Item label="Niveaux">
          <NiveauCheckBox checkedList={niveau} setCheckedList={setNiveau} />
        </Form.Item>
        <Form.Item label="Durée">
          <DatePicker.RangePicker
            allowEmpty={[false, false]}
            onChange={(value) => dateChangeHandler(value)}
            placeholder={["de", "à"]}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [
                dayjs("00:00:00", "HH:mm:ss"),
                dayjs("11:59:59", "HH:mm:ss"),
              ],
            }}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button loading={loading} htmlType="submit" type="primary">
            Valider
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}
