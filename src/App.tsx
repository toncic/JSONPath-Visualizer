import React, { useState, ChangeEvent } from 'react';
import JSONTree from 'react-json-tree';
import { useDropzone } from 'react-dropzone';
import PrimaryButton from './Components/PrimaryButton';
import JsonPathInputField from './Components/JsonPathInputField';
import LoadingComponent from './Components/LoadingComponent';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import exampleJson from './exampleJson.json';
import { JSONPath } from 'jsonpath-plus';

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
  const [jsonToParse, setJsonToParse] = useState<{} | any>(exampleJson);
  const [jsonPathExpression, setJsonPathExpression] = useState<string>('');
  const [fullJson, setFullJson] = useState<{}>(exampleJson);
  const [isFiltering, setFiltering] = useState<boolean>(false);

  function onDrop(acceptedFiles: File[]): void {
    const fileReader = new FileReader();
    fileReader.readAsText(acceptedFiles[0])
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const fileContent: any = fileReader.result;
      try {
        const jsonObject = JSON.parse(fileContent);
        setJsonToParse(jsonObject);
        setFullJson(jsonObject);
        setJsonPathExpression('');
      } catch (error) {
        alert('Oh no, it seems that your file does not contain proper JSON structure. Please check your file and try again');
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.json' });

  function filterJson(inputEvent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setJsonPathExpression(inputEvent.target.value);
    const jsonPath = inputEvent.target.value;
    if (jsonPath) {
      setFiltering(true);
      const filteredJson = JSONPath({
        json: fullJson,
        path: jsonPath,
      });
      setJsonToParse(filteredJson);
      setFiltering(false);
      return;
    }

    setJsonToParse(fullJson);
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
        value={jsonPathExpression}
      />
      <div className={classes.json_tree_view} data-testid="json-tree-view">
        {isFiltering ?
          <LoadingComponent /> : (
            <>
              <Typography
                variant="h6"
                component="h6"
                align="left"
                className={classes.json_tree_view_title}
              >
                Use this example or upload your JSON file
            </Typography>
              <JSONTree data={jsonToParse} />
            </>
          )

        }
      </div>
    </>
  );
}

export default App;
