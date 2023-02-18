import { useState, useEffect, useCallback } from "react";
import { Input, DatePicker, Button, message } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs from "dayjs";

import { Form, Wrapper } from "./CreateArticles.styles";
import NiveauCheckBox from "../components/CheckboxGroup";
import axios from "../api";
import { useAuth } from "../context/AuthProvider";
import { useLocation } from "react-router-dom";

type data = {
  titre: string;
  contenu: string;
  date_debut: string;
  date_fin: string;
  niveau: string[];
  category_id: number;
};

export default function CreateArticle() {
  const location = useLocation();

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  //@ts-ignore
  const { token } = useAuth();

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
        //TODO: add edit functionality
      };

      const res = await axios.post("/articles", data, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
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
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getData = useCallback(async (controller: AbortController) => {
    const id = location.state?.data?.article_id;
    if (id) {
      const url = `/articles/${id}`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });

      console.log(res);

      if (res.status === 200) {
        setTitre(res.data.data.titre);
        setContenu(res.data.data.contenu);
        setNiveau(res.data.data.niveau);
        setDateDebut(res.data.data.date_debut);
        setDateFin(res.data.data.date_fin);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getData(controller);

    return () => controller.abort();
  }, []);

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
          <Input
            value={titre}
            required
            onChange={(e) => setTitre(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="contenu"
          rules={[{ required: true }]}
          requiredMark={true}
        >
          <Input.TextArea
            value={contenu}
            required
            onChange={(e) => setContenu(e.target.value)}
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>
        <Form.Item label="Niveaux">
          <NiveauCheckBox checkedList={niveau} setCheckedList={setNiveau} />
        </Form.Item>
        <Form.Item label="Durée">
          {
            <DatePicker.RangePicker
              // defaultValue={[
              //   dayjs(
              //     dateDebut?.replace("T", " ").split(".")[0],
              //     "YYYY-MM-DD HH:mm:ss"
              //   ),
              //   dayjs(
              //     dateFin?.replace("T", " ").split(".")[0],
              //     "YYYY-MM-DD HH:mm:ss"
              //   ),
              // ]}
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
          }
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
