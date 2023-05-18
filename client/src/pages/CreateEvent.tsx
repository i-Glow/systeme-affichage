import React from "react";
import Map from "../components/Map";
import { Wrapper } from "./styles/Events.styles";

function CreateEvent() {
  return (
    <Wrapper>
      <h3>New Event</h3>
      <Map />
    </Wrapper>
  );
}

export default CreateEvent;
