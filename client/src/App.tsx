import React from "react";
import { MessagesContainer } from "./containers/messages";
import { gRPCClients } from "./gRPCClients";

export const App = () => {
  return (
      <>
        <MessagesContainer clients={gRPCClients} />
      </>
  );
};