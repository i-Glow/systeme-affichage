import { Button, Card, Collapse, message, Popconfirm, Tabs, Tag } from "antd";
import React, { useEffect, useState, useReducer, useRef } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import Flex from "../components/shared/Flex";
import useAxios from "../hooks/useAxios";
import { Description, MapWrapper, Wrapper } from "./styles/Events.styles";
import L, { Map } from "leaflet";

function eventsReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_EVENTS_DATA":
      return {
        ...state,
        events: action.payload,
      };
    case "SET_EVENTS_LOADING":
      return {
        ...state,
        eventsLoading: action.payload,
      };
    case "SET_BLOCS_DATA":
      return {
        ...state,
        blocs: action.payload,
      };
    case "SET_BLOCS_LOADING":
      return {
        ...state,
        blocsLoading: action.payload,
      };
    default:
      return state;
  }
}

function Events() {
  return (
    <Wrapper>
      <Tabs
        defaultActiveKey="1"
        items={[
          { key: "1", label: "Events", children: <Event /> },
          { key: "2", label: "Blocs", children: <Bloc /> },
        ]}
      />
    </Wrapper>
  );
}

function Event() {
  const axios = useAxios();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [state, dispatch] = useReducer(eventsReducer, {
    events: [],
    eventsLoading: true,
  });

  const { events, eventsLoading } = state;

  async function getEvents() {
    try {
      const res = await axios.get("/map/event");
      if (res.status === 200) {
        const newData = res.data.map((el: any) => ({
          ...el,
          start_date: new Date(el.start_date).toDateString(),
          end_date: new Date(el.end_date).toDateString(),
        }));
        dispatch({ type: "SET_EVENTS_DATA", payload: newData });
        dispatch({ type: "SET_EVENTS_LOADING", payload: false });
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        messageApi.open({
          type: "error",
          content: "Please log in",
        });
        dispatch({ type: "SET_EVENTS_LOADING", payload: false });
      } else if (error.code === "ERR_NETWORK") {
        messageApi.open({
          type: "error",
          content: "network error",
        });
        dispatch({ type: "SET_EVENTS_LOADING", payload: false });
      }
    }
  }

  async function deleteEvent(id: string) {
    try {
      const res = await axios.delete(`/map/event/${id}`);

      if (res.status === 201) {
        const newEvents = events.filter((el: any) => el.event_id !== id);

        dispatch({
          type: "SET_EVENTS_DATA",
          payload: newEvents,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error deleting event",
      });
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Flex w="100%" gap="40px" ai="start" jc="start">
      {contextHolder}
      <div style={{ flex: 1 }}>
        <Flex jc="space-between" mb="20px">
          <h2>Events</h2>
          <Button
            type="primary"
            size="middle"
            onClick={() => navigate("event")}
          >
            New
          </Button>
        </Flex>
        {eventsLoading ? (
          "loading"
        ) : events.length > 0 ? (
          events.map((el: any) => (
            <Card
              key={el.event_id}
              style={{ marginBottom: "20px" }}
              actions={[
                <Popconfirm
                  title="delete"
                  description="Are you sure you want to delete this article?"
                  okText="Delete"
                  okType="danger"
                  cancelText="Cancel"
                  onConfirm={() => deleteEvent(el.event_id)}
                >
                  <MdOutlineDeleteOutline
                    size={18}
                    key="delete"
                    onClick={() => {}}
                  />
                  ,
                </Popconfirm>,
              ]}
            >
              <Flex jc="space-between">
                <h3>{el.name}</h3>
                <Flex gap="7px">
                  Starts
                  <h4>{el.start_date}</h4>
                </Flex>
              </Flex>
              <Description>{el.description}</Description>
              <Flex jc="space-between">
                <Flex gap="5px">
                  <Tag color="#e7f2fd">
                    <p style={{ color: "black", padding: "3px 5px" }}>
                      Competition
                    </p>
                  </Tag>
                  <Tag color="#e7f2fd">
                    <p style={{ color: "black", padding: "3px 5px" }}>
                      Competition
                    </p>
                  </Tag>
                </Flex>
                <GrMapLocation size={24} />
              </Flex>
            </Card>
          ))
        ) : (
          <h3>No ongoing events</h3>
        )}
      </div>
    </Flex>
  );
}
function Bloc() {
  const axios = useAxios();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const mapRef = useRef<Map | null>(null);

  const [state, dispatch] = useReducer(eventsReducer, {
    blocs: [],
    blocsLoading: true,
  });

  const { blocs, blocsLoading } = state;

  async function getEvents() {
    try {
      const res = await axios.get("/map/bloc");
      if (res.status === 200) {
        dispatch({ type: "SET_BLOCS_DATA", payload: res.data });
        dispatch({ type: "SET_BLOCS_LOADING", payload: false });
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        messageApi.open({
          type: "error",
          content: "Please log in",
        });
        dispatch({ type: "SET_BLOCS_LOADING", payload: false });
      } else if (error.code === "ERR_NETWORK") {
        messageApi.open({
          type: "error",
          content: "network error",
        });
        dispatch({ type: "SET_BLOCS_LOADING", payload: false });
      }
    }
  }

  async function deleteEvent(id: string) {
    try {
      const res = await axios.delete(`/map/bloc/${id}`);

      if (res.status === 201) {
        const newBlocs = blocs.filter((el: any) => el.event_id !== id);

        dispatch({
          type: "SET_BLOCS_DATA",
          payload: newBlocs,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error deleting event",
      });
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (blocs.length && mapRef.current) {
      const map = mapRef.current;

      blocs.map((bloc: any) => {
        // Create a custom icon with the text
        const textIcon = L.divIcon({
          className: "bloc",
          html: `<div>${bloc.name}</div>`,
        });

        // Add the icon to the map at the desired position
        L.marker([bloc.latitude, bloc.longitude], {
          icon: textIcon,
        }).addTo(map);
      });
    }
  }, [blocs]);

  return (
    <MapWrapper>
      <Flex jc="space-between" mb="20px">
        <h2>Blocs</h2>
        <Button type="primary" size="middle" onClick={() => navigate("bloc")}>
          New
        </Button>
      </Flex>
      <Flex w="100%" gap="40px" ai="start" jc="start">
        {contextHolder}
        <MapContainer
          center={[36.813889, 7.717983]}
          zoom={17}
          scrollWheelZoom={false}
          style={{ flex: 1, height: 360, width: "100%" }}
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </Flex>
    </MapWrapper>
  );
}

export default Events;
