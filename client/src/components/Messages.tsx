import React from "react";
import {useMessages} from "../containers/messages/hooks/useMessages";
import {Grid} from "@material-ui/core";

type Props = ReturnType<typeof useMessages>;

export const Messages: React.FC<Props> = ({messages}) => {
    return (
        <div>
            {messages.map((m, index) => (
                <Grid container alignItems="center" justify="center">
                    <div key={m.getUsername()}>{m.getUsername()}</div>
                    <div key={m.getMessage()}>{m.getMessage()}</div>
                </Grid>
            ))}
        </div>
    );
};