import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface Props {
    text: string;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
}

const useStyles = makeStyles((theme) => ({
    filter: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3),
        width: "-webkit-fill-available"
    },
}));


const JsonPathInputField: React.SFC<Props> = ({
    text,
    onChange,
    value,
}) => {
    const classes = useStyles();

    return (
        <TextField
            id="outlined-basic"
            label={text}
            variant="outlined"
            onChange={onChange}
            value={value}
            className={classes.filter}
        />
    );
}

export default JsonPathInputField;