import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './Form';

const regions = [
  'Central US',
  'East US',
  'East US 2',
  'South Central US',
  'West US 2',
  'West US 3',
];

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
      url: 'https://dev.azure.com/AllITConsultants/_apis/projects?api-version=6.0',
      headers: {
        Authorization:
          'Basic OjI0dTJ6dXUzaHk1eXZxZm96c3FobWszdms3cGt2eWxiYTZzeDR4d2xhcnlhM2ZkbmVxd3E=',
      },
    };

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

  const postData = async (data) => {
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
      url: `https://terraformdemostr.blob.core.windows.net/form/${filename}.json?sp=rac&st=2022-01-29T21:47:08Z&se=2022-01-30T05:47:08Z&spr=https&sv=2020-08-04&sr=c&sig=vhZ0FW%2FQGgwb1nP37MHhBddcZ98qQzt%2FIPKRSR96LK8%3D`,
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        alert(response.statusText);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id='app'>
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
