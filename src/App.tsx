import React, { useState, ChangeEvent } from 'react';
import JSONTree from 'react-json-tree';
import { useDropzone } from 'react-dropzone';
import './App.css';
import PrimaryButton from './Components/PrimaryButton';
import JsonPathInputField from './Components/JsonPathInputField';
import  LoadingComponent from './Components/LoadingComponent';
const {JSONPath} = require('jsonpath-plus');

function App() {
  const [jsonToParse, setJsonToParse] = useState<{} | any>();
  const [jsonPathExpression, setJsonPathExpression] = useState<string>('');
  const [fullJson, setFullJson] = useState<{}>({});
  const [isFileUploaded, setFileUploaded] = useState<boolean>(false);
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
        setFileUploaded(true);
        setJsonPathExpression('');
      } catch (error) {
        alert('Invalid JSON file');
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function filterJson(inputEvent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) :void {
    setJsonPathExpression(inputEvent.target.value);
    let jsonPath = inputEvent.target.value;
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

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <PrimaryButton text={"Upload File"} />
      </div>
      {isFileUploaded && (
        <>
          <JsonPathInputField
            text={'JSONpath Syntax'}
            onChange={filterJson}
            value={jsonPathExpression}
          />
          {isFiltering ?
             <LoadingComponent /> : 
             <JSONTree data={jsonToParse}
          />}
        </>
      )}
    </>
  );
}

export default App;
