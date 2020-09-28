import { CreateMessageRequest } from "../../../proto/messenger_pb";
import { useState, useCallback, SyntheticEvent } from "react";
import { MessengerClient } from "../../../proto/MessengerServiceClientPb";

export const useMessageForm = (client: MessengerClient) => {
    const [userName, setUserName] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const onUserNameChange = useCallback(
        (event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement;
            setUserName(target.value);
        },
        [setUserName]
    );

    const onMessageChange = useCallback(
        (event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement;
            setMessage(target.value);
        },
        [setMessage]
    );

    const onSubmit = useCallback(
        (event: SyntheticEvent) => {
            event.preventDefault();
            const req = new CreateMessageRequest();
            req.setUsername(userName)
            req.setMessage(message);
            client.createMessage(req, null, res => console.log(res));
            setMessage("");
        },
        [client, userName,message]
    );

    return {
        userName,
        message,
        onUserNameChange,
        onMessageChange,
        onSubmit
    };
};