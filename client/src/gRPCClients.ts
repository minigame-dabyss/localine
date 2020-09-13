import { MessengerClient } from "./proto/MessengerServiceClientPb";

export type GRPCClients = {
    messengerClient: MessengerClient;
};

export const gRPCClients = {
    messengerClient: new MessengerClient(`http://localhost:8080`)
};