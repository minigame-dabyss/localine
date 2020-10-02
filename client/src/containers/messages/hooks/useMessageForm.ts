import {
    CreateMessageRequest,
    Event,
    EventType,
    MessageEvent,
    MessageType,
    Source,
    SourceType
} from "../../../proto/messenger_pb";
import {SyntheticEvent, useCallback, useState} from "react";
import {MessengerClient} from "../../../proto/MessengerServiceClientPb";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import {useParams} from "react-router-dom";

export const useMessageForm = (client: MessengerClient,userId:string,isGroup:boolean) => {
    const {name} = useParams();
    // const [userId, setUserId] = useState<string>();
    const [message, setMessage] = useState<string>("");

    // const onUserNameChange = useCallback(
    //     (event: SyntheticEvent) => {
    //         const target = event.target as HTMLInputElement;
    //         setUserId(target.value);
    //     },
    //     [setUserId]
    // );

    const onMessageChange = useCallback(
        (event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement;
            setMessage(target.value);
        },
        [setMessage]
    );

    const onSubmit = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();
            const req = new CreateMessageRequest();
            if(isGroup) {
                const source = new Source();
                source.setType(SourceType.GROUP);
                source.setUserid(userId);
                source.setUsername(name);
                req.setSource(source);
            }else{
                const source = new Source();
                source.setType(SourceType.USER);
                source.setUserid(userId);
                source.setUsername(name);
                req.setSource(source);
            }
            req.setType(EventType.MESSAGE);

            const messageEvent = new MessageEvent();
            messageEvent.setText(message);
            messageEvent.setType(MessageType.TEXT);
            const event = new Event();
            event.setMessage(messageEvent);
            req.setEvent(event);

            const timestamp = new Timestamp();
            timestamp.fromDate(new Date());
            req.setTimestamp(timestamp);
            client.createMessage(req, null, res => console.log(res));
            setMessage("");
        },
        [client, userId,message,name]
    );

    return {
        // userName: userId,
        message,
        // onUserNameChange,
        onMessageChange,
        onSubmit
    };
};