import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {Messages} from "./Messages";
import {MessageForm} from "./MessageForm";
import {useMessages} from "../containers/messages/hooks/useMessages";
import {MessengerClient} from "../proto/MessengerServiceClientPb";
import {useMessageForm} from "../containers/messages/hooks/useMessageForm";
import {Link, useParams} from "react-router-dom";
import seedrandom from "seedrandom";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '100vh',
        overflow: "auto",
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '90vh',
        overflowY: 'auto'
    }
});

type Props = {
    client: MessengerClient;
    userId: string;
    isGroup:boolean;
};

export const getRandomRgb = (str:string|undefined) :string =>{
    const rng = seedrandom(str);
    const rgb = `rgb(${Math.floor(256*rng())},${Math.floor(256*rng())},${Math.floor(256*rng())})`
    return rgb
}

export const Chat:React.FC<Props> = ({client,userId,isGroup}) => {
    const classes = useStyles();
    const {name} = useParams();
    const messagesState = useMessages(client,userId,isGroup);
    const messageFormState = useMessageForm(client,userId,isGroup);

    return (
        <React.Fragment>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt={name} style={{backgroundColor:getRandomRgb(name)}}
                                        src="https://image.flaticon.com/icons/png/512/17/17181.png" />
                            </ListItemIcon>
                            <ListItemText primary={name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="user-id" label="userID" value={userId} variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        <Link to={`/users/${name}/group`} style={{ textDecoration: 'none',color:"inherit" }}>
                        <ListItem button key="Group">
                            <ListItemIcon>
                                <Avatar alt="Group" src="https://i.pinimg.com/originals/46/d5/0d/46d50d3e447441691cbba8525abf075e.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="グループ"></ListItemText>
                        </ListItem>
                        </Link>
                        <Link to={`/users/${name}/room`} style={{ textDecoration: 'none',color:"inherit" }}>
                        <ListItem button key="Bot">
                            <ListItemIcon>
                                <Avatar alt="Bot" src="https://image.flaticon.com/icons/png/512/17/17181.png" />
                            </ListItemIcon>
                            <ListItemText primary="bot"></ListItemText>
                        </ListItem>
                        </Link>
                    </List>
                </Grid>
                <Grid item xs={9}>
                        <Toolbar style={{height:"7vh"}}>
                            {isGroup &&
                            <Typography variant="h6" color="inherit">
                                グループ
                            </Typography>
                            }
                            {!isGroup &&
                            <Typography variant="h6" color="inherit">
                                bot
                            </Typography>
                            }
                        </Toolbar>

                    <Messages {...messagesState} />
                    <Divider />
                    <MessageForm {...messageFormState} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
