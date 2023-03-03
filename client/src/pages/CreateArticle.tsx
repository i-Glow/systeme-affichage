import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { AxiosRequestConfig } from "axios";
import {
  Input,
  DatePicker,
  Button,
  message,
  Select,
  Form,
  Segmented,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { BsPlusLg } from "react-icons/bs";
import { FormWrapper, Wrapper } from "./styles/CreateArticles.styles";
import NiveauCheckBox from "../components/CheckboxGroup";
import { useAuth } from "../context/AuthProvider";
import useAxios from "../hooks/useAxios";
import Flex from "../components/shared/Flex";
import LatestArticles from "../components/LatestArticles";

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
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");
  const [checkBoxMessageError, setCheckBoxMessageError] = useState(false);
  const [dateMessageError, setDateMessageError] = useState(false);

  //article
  const [categories, setCategories] = useState<Categorie[]>();
  const [titre, setTitre] = useState<string>("");
  const [contenu, setContenu] = useState<string>("");
  const [category, setCategory] = useState<string>();
  const [niveau, setNiveau] = useState<CheckboxValueType[]>([]);
  const [dateDebut, setDateDebut] = useState<string>();
  const [dateFin, setDateFin] = useState<string>();
  //new articles
  const [newArticles, setNewArticles] = useState<data[] | undefined>([]);

  function directionChangeHandler() {
    direction === "rtl" ? setDirection("ltr") : setDirection("rtl");
  }

  function dateChangeHandler(value: any) {
    setDateDebut(value[0].$d.toISOString());
    setDateFin(value[1].$d.toISOString());
  }

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

      if (location.pathname.includes("/articles/edit")) {
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
      console.log(token);
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

        //update new articles list
        setNewArticles((prev: any) => [...prev, res.data.data]);

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
    try {
      const res = await axios.get("/categorie", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        if (res.data.data.length === 0) {
          setIsInputShow(true);
        } else {
          setCategories(res.data.data);
          setCategory(res.data.data[0]?.nom);
        }
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Erreur",
      });
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getData(controller);
    getCategories();
  }, []);

  return (
    <Wrapper>
      <h3>
        {location.pathname.includes("/articles/edit")
          ? "Edit article"
          : "Create article"}
      </h3>
      <FormWrapper>
        {contextHolder}
        <Form
          form={form}
          labelAlign={"left"}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label="language">
            <Segmented
              onChange={directionChangeHandler}
              style={{ color: "rgb(200, 200, 200)" }}
              options={["عربية", "foreign"]}
            />
          </Form.Item>
          <Form.Item
            label="titre"
            rules={[{ required: true, message: "Please input your name" }]}
            requiredMark={true}
          >
            <Input
              style={{ direction }}
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
              style={{ height: 120, resize: "none", direction }}
              showCount
              maxLength={500}
            />
          </Form.Item>
          <Form.Item label="categorie">
            <Flex jc="start" gap="5px">
              {!isInputShow && categories?.length ? (
                <Select
                  defaultValue={category}
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
                  if (isInputShow && categories?.length) {
                    setCategory(categories[0].nom);
                    setIsInputShow(false);
                  } else {
                    setCategory("");
                    setIsInputShow(true);
                  }
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
      </FormWrapper>
      {newArticles?.length ? (
        <LatestArticles newArticles={newArticles} />
      ) : null}
    </Wrapper>
  );
}
