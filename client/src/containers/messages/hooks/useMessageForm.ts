import { CreateMessageRequest } from "../../../proto/messenger_pb";
import { useState, useCallback, SyntheticEvent } from "react";
import { MessengerClient } from "../../../proto/MessengerServiceClientPb";

export const useMessageForm = (client: MessengerClient) => {
    const [message, setMessage] = useState<string>("");

    const onChange = useCallback(
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
            req.setMessage(message);
            client.createMessage(req, null, res => console.log(res));
            setMessage("");
        },
        [client, message]
    );

    return {
        message,
        onChange,
        onSubmit
    };
};