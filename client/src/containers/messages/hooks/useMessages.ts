import { GetMessagesRequest,GetMessagesResponse} from "../../../proto/messenger_pb";
import { useState, useEffect } from "react";
import { MessengerClient } from "../../../proto/MessengerServiceClientPb";

export const useMessages = (client: MessengerClient) => {
     const [messages, setMessages] = useState<GetMessagesResponse[]>([]);

    useEffect(() => {
        const request = new GetMessagesRequest();
        const stream$ = client.getMessages(request);
        stream$.on("data", (m) => {
            setMessages(state => [...state, m]);
        });
    }, [client]);

    return {
        messages
    };
};
