
import { useState, useEffect, useCallback, useRef } from "react";
import { Input, DatePicker, Button, message ,Select } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useLocation } from "react-router-dom";
import { AxiosRequestConfig } from "axios";

import dayjs from "dayjs";
import { Form, Wrapper } from "./styles/CreateArticles.styles";
import NiveauCheckBox from "../components/CheckboxGroup";
import { useAuth } from "../context/AuthProvider";
import useAxios from "../hooks/useAxios";
import { BsPlusLg } from "react-icons/bs";
import Flex from "../components/shared/Flex";

type Categorie = {
  category_id: number | null;
  nom: string;
};

type data = {
  titre: string;
  contenu: string;
  date_debut: string;
  date_fin: string;
  niveau: string[];
  categoryName: string;
};

export default function CreateArticle() {
  //@ts-ignore
  const { token } = useAuth();
  const axios = useAxios();
  const location = useLocation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  //control state
  const [loading, setLoading] = useState<boolean>(false);
  const [isInputShow, setIsInputShow] = useState<boolean>(false);

  const [categories, setCategories] = useState<Categorie[]>();
  const [titre, setTitre] = useState<string>("");
  const [contenu, setContenu] = useState<string>("");
  const [category, setCategory] = useState<string>();
  const [niveau, setNiveau] = useState<CheckboxValueType[]>([]);
  const [dateDebut, setDateDebut] = useState<string>();
  const [dateFin, setDateFin] = useState<string>();
  const [boolean, setBoolean] = useState(false);
  function dateChangeHandler(value: any) {
    setDateDebut(value[0].$d.toISOString());
    setDateFin(value[1].$d.toISOString());
  }
  const [checkBoxMessageError, setCheckBoxMessageError] = useState(false);
  const [dateMessageError, setDateMessageError] = useState(false);
  async function onFinish() {
    setLoading(true);
    if (niveau.length === 0) {
      setCheckBoxMessageError(true);
      setLoading(false);
      return;
    }
    setCheckBoxMessageError(false);
    if (!dateDebut || !dateFin || !category) {
      setDateMessageError(true);
      setLoading(false);
      return;
    }
    setDateMessageError(false);
    try {
      let config: AxiosRequestConfig;

      if (location.pathname.includes("/archive/edit")) {
        const id = location.pathname.split("/").at(-1);

        config = {
          method: "put",
          url: `/articles/${id}`,
        };
      } else {
        config = {
          method: "post",
          url: `/articles`,
        };
      }
      const data: data = {
        titre,
        contenu,
        date_debut: dateDebut,
        date_fin: dateFin,
        niveau: niveau as string[],
        categoryName: category,
      };

      const res = await axios({
        ...config,
        data,
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Article créé",
        });

        //empty fields
        setTitre("");
        setContenu("");
        setNiveau([]);
      } else if (res.status === 204) {
        messageApi.open({
          type: "success",
          content: "Article édité",
        });
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Erreur",
      });
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

      if (res.status === 200) {
        setTitre(res.data.data.titre);
        setContenu(res.data.data.contenu);
        setNiveau(res.data.data.niveau);
        setDateDebut(res.data.data.date_debut);
        setDateFin(res.data.data.date_fin);
        setCategory(res.data.data.categorie.nom);
      }
    }
  }, []);

  const getCategories = useCallback(async () => {
    const res = await axios.get("/categorie", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      setCategories(res.data.data);
      setCategory(res.data.data[0].nom);
    }
  }, []);


  useEffect(() => {
    const controller = new AbortController();
    getData(controller);
    getCategories();
  }, []);

  return (
    <Wrapper>
      {contextHolder}
      <Form
        form={form}
        labelAlign={"left"}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onSubmitCapture={() => {}}
      >
        <Form.Item
          label="titre"
          rules={[{ required: true, message: "Please input your name" }]}
          requiredMark={true}
        >
          <Input
            value={titre}
            showCount
            maxLength={100}
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
            showCount
            maxLength={500}
          />
        </Form.Item>
        <Form.Item label="categorie">
          <Flex jc="start" gap="5px">
            {!isInputShow && categories ? (
              <Select
                defaultValue={categories[0].nom}
                style={{ width: 120 }}
                onChange={(value) => setCategory(value)}
                options={categories.map((cat) => {
                  return {
                    label: cat.nom,
                    value: cat.nom,
                  };
                })}
              />
            ) : (
              <Input
                style={{ width: "120px" }}
                onChange={(e) => setCategory(e.target.value)}
              />
            )}
            <Button
              type="dashed"
              icon={
                <BsPlusLg
                  style={{
                    transform: `rotate(${isInputShow ? "45" : "0"}deg)`,
                    transition: "0.1s",
                  }}
                />
              }
              onClick={() => {
                if (isInputShow && categories) {
                  setCategory(categories[0].nom);
                } else {
                  setCategory("");
                }
                setIsInputShow(!isInputShow);
              }}
            />
          </Flex>
        </Form.Item>
        <Form.Item label="Niveaux">
          <NiveauCheckBox checkedList={niveau} setCheckedList={setNiveau} />
          <p style={{ color: "red" }}>
            {checkBoxMessageError ? "pick a level" : null}
          </p>
        </Form.Item>
        <Form.Item label="Durée">
          {location.pathname.includes("/archive/edit") ? (
            dateDebut && dateFin ? (
              <DatePicker.RangePicker
                defaultValue={[
                  dayjs(
                    dateDebut?.replace("T", " ").split(".")[0],
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  dayjs(
                    dateFin?.replace("T", " ").split(".")[0],
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                ]}
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
            ) : null
          ) : (
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
          )}
          <p style={{ color: "red" }}>
            {dateMessageError ? "pick a Date" : null}
          </p>
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
