import React, { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button, Form, Input, Space } from "antd";
import Flex from "./shared/Flex";
import { FormWrapper } from "./Style/Map.styles";

const position: LatLngTuple = [36.813889, 7.717983];

function Map() {
  const [location, setLocation] = useState([]);

  return (
    <>
      <MapContainer
        center={[36.813889, 7.717983]}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "600px" }}
      >
        <FaMapMarkerAlt
          size={32}
          style={{
            position: "absolute",
            left: "50%",
            top: "200px",
            transform: "translate(-50%, -50%)",
            zIndex: 4000,
          }}
        />
        <MapMoveHandler setLocation={setLocation} />
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <DataForm />
    </>
  );
}

function DataForm() {
  return (
    <FormWrapper>
      <Form layout="vertical" spellCheck={false}>
        <Form.Item>
          <Flex gap="70px" jc="space-between">
            <Form.Item label="Name" style={{ width: "300px" }}>
              <Input />
            </Form.Item>
            <Flex gap="20px">
              <Form.Item label="Start date">
                <Input />
              </Form.Item>
              <Form.Item label="End date">
                <Input />
              </Form.Item>
            </Flex>
          </Flex>
          <Form.Item label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form.Item>
        <Flex jc="end">
          <Button
            type="primary"
            style={{ padding: "0 40px", marginTop: "-30px" }}
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
