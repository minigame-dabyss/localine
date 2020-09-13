import { GetMessagesRequest} from "../../../proto/messenger_pb";
import { useState, useEffect } from "react";
import { MessengerClient } from "../../../proto/MessengerServiceClientPb";

export const useMessages = (client: MessengerClient) => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const request = new GetMessagesRequest();
        const stream$ = client.getMessages(request);
        stream$.on("data", (m) => {
            setMessages(state => [...state, m.getMessage()]);
        });
    }, [client]);

    return {
        messages
    };
};
