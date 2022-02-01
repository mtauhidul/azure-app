import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import {
  GET_PROJECTS_KEY,
  GET_PROJECTS_URL,
  POST_PROJECTS_KEY,
  POST_PROJECTS_URL,
} from './config';
import Form from './Form';

// List of US regions
const regions = [
  'Central US',
  'East US',
  'East US 2',
  'South Central US',
  'West US 2',
  'West US 3',
];

// List of resources
// Resource is possible to take multiple time - name filed is not empty
const resourceTypes = [
  {
    type: 'App service',
    name: 'App service',
  },
  {
    type: 'Function app',
    name: 'Function app',
  },
  {
    type: 'Key Vault',
    name: '',
  },
  {
    type: 'Front Door',
    name: '',
  },
  {
    type: 'Application Gateway',
    name: '',
  },
  {
    type: 'Cosmos Database (sql)',
    name: 'Cosmos Database (sql)',
  },
  {
    type: 'Cosmos DB (mongo)',
    name: '',
  },
  {
    type: 'Sql database Service Bus',
    name: 'Sql database Service Bus',
  },
  {
    type: 'Synapse workspace',
    name: '',
  },
  {
    type: 'Data Factory',
    name: '',
  },
  {
    type: 'Storage account',
    name: 'Storage account',
  },
  {
    type: 'Machine Learning Workspace',
    name: '',
  },
];

const App = () => {
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  useEffect(() => {
    var config = {
      method: 'get',
      url: GET_PROJECTS_URL,
      headers: {
        Authorization: GET_PROJECTS_KEY,
      },
    };

    // Get all projects under the organization
    const getProjects = async () => {
      await axios(config)
        .then(function (response) {
          setProjects(response.data.value);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getProjects();
  }, []);

  // Post all form data to server
  const postData = (data) => {
    const today = new Date();
    const filename =
      'post' +
      '_' +
      today.getDate() +
      '' +
      (today.getMonth() + 1) +
      '' +
      today.getFullYear().toString().substr(-2) +
      '.' +
      today.getHours() +
      today.getMinutes();

    var config = {
      method: 'put',
      url: `${POST_PROJECTS_URL}${filename}${POST_PROJECTS_KEY}`,
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const sendData = async () => {
      await axios(config)
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    };

    const dataSend = sendData();

    toast.promise(dataSend, {
      loading: 'Submitting data',
      success: 'Data submitted successfully',
      error: 'Error! Try again',
    });
  };

  return (
    <div id='app'>
      <Toaster position='top-center' reverseOrder={false} />
      <Form
        projects={projects}
        regions={regions}
        resources={resources}
        setResources={setResources}
        resourceTypes={resourceTypes}
        postData={postData}
      />
    </div>
  );
};

export default App;
