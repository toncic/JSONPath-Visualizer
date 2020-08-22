import React from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

interface Props {
  text: string;
  onClick?: (arg: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PrimaryButton: React.SFC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  text,
  onClick
}) => {
  return (
    <Button 
      variant="outlined"
      color="primary" 
      size="large" 
      startIcon={<CloudUploadIcon />}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;