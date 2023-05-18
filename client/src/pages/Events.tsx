import { Button, Card, Collapse, message, Popconfirm, Tabs, Tag } from "antd";
import React, { useEffect, useState, useReducer } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Flex from "../components/shared/Flex";
import useAxios from "../hooks/useAxios";
import { Description, Wrapper } from "./styles/Events.styles";

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
        console.log("first");
        console.log({ newData });
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
        {eventsLoading
          ? "loading"
          : events.length > 0 &&
            events.map((el: any) => (
              <Card
                style={{ marginBottom: "20px" }}
                actions={[
                  <AiOutlineEdit size={18} key="edit" />,
                  <Popconfirm
                    title="delete"
                    description="Are you sure you want to delete this article?"
                    okText="Delete"
                    okType="danger"
                    cancelText="Cancel"
                    // okButtonProps={{ loading: confirmLoading }}
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
            ))}
      </div>
    </Flex>
  );
}

function Bloc() {
  return <>Bloc</>;
}

export default Events;
