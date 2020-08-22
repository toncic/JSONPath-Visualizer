import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  text: string;
  onClick?: (arg: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

const PrimaryButton: React.SFC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  text,
  onClick
}) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<CloudUploadIcon />}
      className={classes.button}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;