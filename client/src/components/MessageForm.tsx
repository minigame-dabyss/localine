import React from "react";
import {useMessageForm} from "../containers/messages/hooks/useMessageForm";
import TextField from "@material-ui/core/TextField";
import {SendButton} from "./SendButton";
import {Grid} from "@material-ui/core";

type Props = ReturnType<typeof useMessageForm>;

export const MessageForm: React.FC<Props> = ({userName, message, onUserNameChange, onMessageChange, onSubmit}) => {
    return (

        <Grid container alignItems="center" justify="center">
            <form className="wrap" noValidate autoComplete="off" onSubmit={onSubmit}>
                <Grid item xs={4}>
                    <input type="text" value={userName} onChange={onUserNameChange}/>
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-text"
                        label="メッセージを入力"
                        className="text"
                        margin="normal"
                        value={message}
                        onChange={onMessageChange}
                    />
                    <SendButton/>
                </Grid>
            </form>
        </Grid>
    );
};