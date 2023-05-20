import { useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button, DatePicker, Form, Input, message, Space } from "antd";
import Flex from "../components/shared/Flex";
import { FormWrapper } from "../components/Style/Map.styles";
import useAxios from "../hooks/useAxios";
import { Wrapper } from "./styles/Events.styles";

function CreateBloc() {
  return (
    <Wrapper>
      <h3 style={{ marginBottom: "20px" }}>New Bloc</h3>
      <Map />
    </Wrapper>
  );
}

function Map() {
  const [position, setPosition] = useState([36.813889, 7.717983]);

  return (
    <Flex gap="20px" ai="start">
      <DataForm position={position} />
      <MapContainer
        center={[36.813889, 7.717983]}
        zoom={17}
        scrollWheelZoom={false}
        style={{ flex: 1, height: 360 }}
      >
        <FaMapMarkerAlt
          size={32}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -100%)",
            zIndex: 4000,
          }}
        />
        <MapMoveHandler setLocation={setPosition} />
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Flex>
  );
}

function DataForm({ position }: any) {
  const [form] = Form.useForm();
  const axios = useAxios();
  const [messageApi, contextHolder] = message.useMessage();

  const name = useRef("");

  const [loading, setLoading] = useState(false);

  async function createEvent() {
    try {
      setLoading(true);
      console.log({
        name: name.current,
        position,
      });

      const res = await axios({
        method: "post",
        url: "/map/bloc",
        data: {
          name: name.current,
          latitude: position[0],
          longitude: position[1],
        },
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Bloc created",
        });
      }
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormWrapper>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        spellCheck={false}
        onFinish={createEvent}
      >
        <Form.Item>
          <Flex gap="70px" jc="space-between">
            <Form.Item label="Name" style={{ width: "300px" }}>
              <Input
                onChange={(e) => (name.current = e.target.value)}
                required
              />
            </Form.Item>
          </Flex>
        </Form.Item>
        <Flex>
          <Button
            loading={loading}
            htmlType="submit"
            type="primary"
            style={{ width: "100%", marginBottom: "-80px" }}
          >
            Create
          </Button>
        </Flex>
      </Form>
    </FormWrapper>
  );
}

function MapMoveHandler({ setLocation }: any) {
  const map = useMap();

  const handleMapMove = () => {
    const center = map.getCenter();
    setLocation([center.lat, center.lng]);
  };

  useMapEvent("moveend", handleMapMove);

  return null;
}

export default CreateBloc;
