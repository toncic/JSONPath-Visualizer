import React from "react";
import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "absolute",
      top: "47.5%",
      left: "47.5%"
    }
  })
);
const LoadingComponent: React.SFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default LoadingComponent;