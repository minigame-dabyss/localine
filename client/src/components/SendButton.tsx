import React from "react";

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 5,
    },
}));

export const SendButton = () => {
    const classes = useStyles();

    return (
        <Button variant="contained" color="primary" className={classes.button} type="submit">
            <Icon>send</Icon>
        </Button>
    );
}