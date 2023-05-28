import React, { useEffect, useRef, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button, DatePicker, Form, Input, message, Space } from "antd";
import Flex from "./shared/Flex";
import { FormWrapper } from "./Style/Map.styles";
import dayjs from "dayjs";
import useAxios from "../hooks/useAxios";

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
            transform: "translate(-50%, -50%)",
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
  const startDate = useRef("");
  const endDate = useRef("");
  const description = useRef("");

  const [loading, setLoading] = useState(false);

  function dateChangeHandler(value: any) {
    startDate.current = value[0].$d.toISOString();
    endDate.current = value[1].$d.toISOString();
  }

  async function createEvent() {
    try {
      setLoading(true);
      console.log({
        name: name.current,
        startDate: startDate.current,
        endDate: endDate.current,
        description: description.current,
        position,
      });

      const res = await axios({
        method: "post",
        url: "/map/event",
        data: {
          name: name.current,
          start_date: startDate.current,
          end_date: endDate.current,
          description: description.current,
          latitude: position[0],
          longitude: position[1],
        },
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Event created",
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
            <Flex gap="20px">
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
            </Flex>
          </Flex>
          <Form.Item label="Description">
            <Input.TextArea
              style={{ height: 140, resize: "none" }}
              showCount
              maxLength={200}
              onChange={(e) => (description.current = e.target.value)}
              required
            />
          </Form.Item>
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

export default Map;
