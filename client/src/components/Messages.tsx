import React, {useEffect, useRef} from "react";
import {useMessages} from "../containers/messages/hooks/useMessages";
import {Box, Grid} from "@material-ui/core";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {getRandomRgb} from "./Chat";
import {EventType, GetMessagesResponse, SourceType} from "../proto/messenger_pb";

type Props = ReturnType<typeof useMessages>;

const useStyles = makeStyles({
    messageArea: {
        height: '83vh',
        overflowY: 'auto'
    },
    messageList: {},
    avatar: {
        width: "52px",
        height: "52px",
    },
    him: {
        width: "fit-content",
        display: "inline-block",
        position: "relative",
        margin: "0 0 0 20px",
        padding: "8px",
        maxWidth: "330px",
        borderRadius: "12px",
        background: "#edf1ee",
        '&:after': {
            content: '""',
            display: "inline-block",
            position: "absolute",
            top: "3px",
            left: "-19px",
            border: "8px solid transparent",
            borderRight: "18px solid #edf1ee",
            webkitTransform: "rotate(35deg)",
            transform: "rotate(35deg)",
        }
    },
    myMessage: {
        margin: "5px 0",
        textAlign: "right",
    },
    myMessageText: {
        display: "inline-block",
        position: "relative",
        textAlign: "left",
        margin: "0 20px 0 0",
        padding: "8px",
        paddingRight: "10px",
        maxWidth: "250px",
        borderRadius: "12px",
        background: "#30e852",
        fontSize: "15px",
        '&:after': {
            content: '""',
            position: "absolute",
            top: "3px",
            right: "-19px",
            border: "8px solid transparent",
            borderRight: "18px solid #30e852",
            webkitTransform: "rotate(145deg)",
            transform: "rotate(145deg)",
        }
    }
})


export const Messages: React.FC<Props> = ({messages, userId, isGroup}) => {
    const classes = useStyles();

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef<any>();
        useEffect(() => {
            if (elementRef.current) {
                elementRef.current.scrollIntoView()
            }
        }, [messages]);
        return <div ref={elementRef}/>;
    };

    const getMinute = (m: GetMessagesResponse): string => {
        const minute = m.getTimestamp()?.toDate().getMinutes()
        const res = minute && minute >= 10 ? String(minute) : "0" + String(minute);
        return res;
    }

    return (
        <List className={classes.messageArea} id="messageArea">
            {messages.map((m, index) => (
                <Box key={`${index}Box`}>
                    {((isGroup && m.getSource()?.getType() === SourceType.GROUP && m.getSource()?.getUserid() !== userId)
                        || (!isGroup && m.getSource()?.getType() === SourceType.USER && m.getSource()?.getUserid() === "bot"))
                    && m.getType() === EventType.MESSAGE &&
                    <ListItem key={index} className={classes.messageList}>
                        <Grid container>
                            <Grid item style={{margin: 0}}>
                                <ListItemIcon style={{width: "52px"}}>
                                    <Avatar className={classes.avatar} alt="Remy Sharp"
                                            style={{backgroundColor: getRandomRgb(m.getSource()?.getUsername())}}
                                            src="https://image.flaticon.com/icons/png/512/17/17181.png"/>
                                </ListItemIcon>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" style={{width: "auto"}}>
                                    <ListItemText primary={m.getSource()?.getUsername()}
                                                  style={{paddingLeft: "10px", marginBottom: 0}}/>

                                    <Grid container>
                                        <Box className={classes.him}>
                                            <ListItemText text-align="right"
                                                          primary={m.getEvent()?.getMessage()?.getText()}></ListItemText>
                                        </Box>
                                        <Grid item>
                                            <ListItemText text-align="right"
                                                          secondary={`${m.getTimestamp()?.toDate().getHours()}:${getMinute(m)}`}
                                                          style={{
                                                              position: "absolute",
                                                              bottom: 0,
                                                              paddingLeft: "5px"
                                                          }}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </ListItem>
                    }

                    {((isGroup && m.getSource()?.getType() === SourceType.GROUP && m.getSource()?.getUserid() === userId)
                        || (!isGroup && m.getSource()?.getType() === SourceType.USER && m.getSource()?.getUserid() === userId))
                    && m.getType() === EventType.MESSAGE &&
                    <ListItem key={index} className={classes.messageList}>
                        <Grid container justify="flex-end">
                            <Grid item style={{position: "relative", width: "44px"}}>
                                <ListItemText text-align="right"
                                              secondary={`${m.getTimestamp()?.toDate().getHours()}:${getMinute(m)}`}
                                              style={{position: "absolute", bottom: 0}}></ListItemText>
                            </Grid>
                            <Grid item className={classes.myMessage}>
                                <ListItemText text-align="right" primary={m.getEvent()?.getMessage()?.getText()}
                                              className={classes.myMessageText}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    }
                </Box>
            ))}
            <AlwaysScrollToBottom/>
        </List>
    );
};