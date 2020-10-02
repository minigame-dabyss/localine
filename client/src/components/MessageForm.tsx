import React from "react";
import {useMessageForm} from "../containers/messages/hooks/useMessageForm";
import {Grid} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Telegram} from "@material-ui/icons";

type Props = ReturnType<typeof useMessageForm>;

export const MessageForm: React.FC<Props> = ({ message, onMessageChange, onSubmit}) => {
    return (

        <Grid container style={{paddingLeft: "10px", paddingRight: "10px",paddingTop:"10px"}}>
            <ValidatorForm style={{width:"100%"}} onError={errors => console.log(errors)} onSubmit={onSubmit}>
                <Grid container>
                <Grid item xs={10}>
                    <TextValidator id="outlined-basic-email" label="メッセージを入力" value={message} name="message"
                               onChange={onMessageChange} fullWidth validators={["required"]} errorMessages={["メッセージを入力してください"]}/>
                </Grid>
                <Grid item xs={1} text-align="right" >
                    <Fab color="primary" aria-label="add" style={{width:"52px",height:"52px"}} onClick={onSubmit}><SendIcon/></Fab>
                </Grid>
                    <Grid item xs={1} text-align="right" >
                        <Fab color="secondary" aria-label="add" style={{width:"52px",height:"52px"}} onClick={onSubmit}><Telegram/></Fab>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </Grid>
    );
};