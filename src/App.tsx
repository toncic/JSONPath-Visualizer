import React, { useState, ChangeEvent } from 'react';
import JSONTree from 'react-json-tree';
import { useDropzone } from 'react-dropzone';
import PrimaryButton from './Components/PrimaryButton';
import JsonPathInputField from './Components/JsonPathInputField';
import LoadingComponent from './Components/LoadingComponent';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { AppState } from './State/AppState';
const { JSONPath } = require('jsonpath-plus');

const useStyles = makeStyles((theme) => ({
  text: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: "#303030",
  },
  json_tree_view: {
    margin: theme.spacing(3),
  },
  json_tree_view_title: {
    opacity: "70%",
  },
}));

function App() {
  function onDrop(acceptedFiles: File[]): void {
    const fileReader = new FileReader();
    fileReader.readAsText(acceptedFiles[0])
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const fileContent: any = fileReader.result;
      try {
        const jsonObject = JSON.parse(fileContent);
        AppState.setJsonObjectToParse(jsonObject)
        AppState.setFullJsonObject(jsonObject)
        AppState.resetJsonPathExpresion();
      } catch (error) {
        alert('Oh no, it seems that your file does not contain a proper JSON structure. Please check your file and try again');
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.json' });

  function filterJson(inputEvent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    AppState.setJsonPathExpression(inputEvent.target.value);
    let jsonPath = inputEvent.target.value;
    if (jsonPath) {
      AppState.setIsFiltering(true);
      const filteredJson = JSONPath({
        json: AppState.fullJsonObject,
        path: jsonPath,
      });
      AppState.setJsonObjectToParse(filteredJson);
      AppState.setIsFiltering(false);
      return;
    }

    AppState.setJsonObjectToParse(AppState.fullJsonObject);
  }

  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" component="h3" align="left" className={classes.text}>
        JSONPath Visualizer
      </Typography>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <PrimaryButton text={"Upload File"} />
      </div>

      <JsonPathInputField
        text={'JSONPath Syntax'}
        onChange={filterJson}
        value={AppState.jsonPathExpression}
      />
      <div className={classes.json_tree_view}>
        {AppState.isFiltering ?
          <LoadingComponent /> : (
            <>
              <Typography variant="h6" component="h6" align="left" className={classes.json_tree_view_title}>
                Use this example or upload your JSON file
            </Typography>
              <JSONTree data={AppState.jsonObjectToParse} />
            </>
          )

        }
      </div>
    </>
  );
}

export default observer(App)
