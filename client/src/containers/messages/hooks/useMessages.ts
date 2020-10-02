import {GetMessagesRequest, GetMessagesResponse, SourceType} from "../../../proto/messenger_pb";
import {useEffect, useState} from "react";
import {MessengerClient} from "../../../proto/MessengerServiceClientPb";

export const useMessages = (client: MessengerClient,userId:string,isGroup:boolean) => {
    const [messages, setMessages] = useState<GetMessagesResponse[]>([]);

    useEffect(() => {
        const request = new GetMessagesRequest();
        const stream$ = client.getMessages(request);
        stream$.on("data", (m) => {
            setMessages(state => [...state, m]);
        });

    }, [client]);

    return {
        messages,
        userId,
        isGroup,
    };
};
