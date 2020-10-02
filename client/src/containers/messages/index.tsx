import React from "react";
import {GRPCClients} from "../../gRPCClients";
import {Grid} from "@material-ui/core";
import {Chat} from "../../components/Chat";
import {useParams} from "react-router-dom";
import md5 from "md5";

type Props = {
    clients: GRPCClients;
    isGroup:boolean;
};

export const MessagesContainer: React.FC<Props> = ({clients,isGroup}) => {
    const messengerClient = clients.messengerClient;
    const {name} = useParams();
    const userId = `U${md5(name)}`;

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={1} md={2}></Grid>
                <Grid item xs={10} md={8}>
                    <Chat client={messengerClient} userId={userId} isGroup={isGroup}></Chat>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};