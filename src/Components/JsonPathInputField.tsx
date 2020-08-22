import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface Props {
    text: string;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const JsonPathInputField: React.SFC<Props> = ({
    text,
    onChange,
    value,
}) => {
    const classes = useStyles();

    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic" 
          label={text} 
          variant="outlined"
          onChange={onChange}
          value={value}
        />
      </form>
    );
}

export default JsonPathInputField;