import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import exampleJson from './exampleJson.json';
import { JSONPath } from 'jsonpath-plus';

test('renders upload file button', () => {
  const { getByText } = render(<App />);
  const uploadButton = getByText(/Upload File/);
  expect(uploadButton).toBeInTheDocument();
});

test('renders input filed for syntax', () => {
  const { getByLabelText } = render(<App />);
  const inputField = getByLabelText(/JSONPath Syntax/);
  expect(inputField).toBeInTheDocument();
});

test('renders JSON output', () => {
  const { getByTestId } = render(<App />);
  const element = getByTestId(/json-tree-view/);
  expect(element).toBeInTheDocument();
});

test('basic JSONPath functionality', () => {
  const result = JSONPath({
    json: exampleJson,
    path: '$.age',
  });
  expect(result).toEqual([25]);
});