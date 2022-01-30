import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({
  postData,
  projects,
  regions,
  resources,
  setResources,
  resourceTypes,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data = { ...data, 'Resource Types': resources };
    postData(data);
  };
  if (errors.length > 0) {
    console.log(errors);
  }

  // This function adding any resource first time to the list
  const getResources = (idx) => {
    const value = resourceTypes[idx];
    const duplicate = resources.find(
      (resource) => resource.type === value.type
    );
    if (!duplicate) {
      setResources([...resources, value]);
    }
  };

  // This function adding any resource multiple time to the list
  const addDuplicateResource = (input) => {
    const value = input.type.replace(/[0-9]/g, '');
    const duplicates = resources.filter((resource) => {
      const target = value.split(' ');
      return resource.type.includes(target[0] + ' ' + target[1]);
    });
    if (duplicates.length > 0) {
      setResources([
        ...resources,
        {
          type: `${value} ${duplicates.length + 1}`,
          name: `${value} ${duplicates.length + 1}`,
        },
      ]);
    }
  };

  // Editing name of multiple featured resources
  const handleNameEdit = (item, value) => {
    const target = resources.find((resource) => resource === item);
    const index = resources.indexOf(target);
    resources[index].name = value;
    setResources(resources);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        required
        type='text'
        placeholder='Application name'
        {...register('Application name', { required: true })}
      />
      <select
        required
        {...register('Azure devops project', { required: true })}>
        {projects.map((project, index) => {
          return (
            <option key={index} value={project.name}>
              {project.name}
            </option>
          );
        })}
      </select>
      <input
        required
        type='text'
        placeholder='Application DNS name'
        {...register('Application DNS name', { required: true })}
      />
      <input
        required
        type='email'
        placeholder='Owner email'
        {...register('Owner email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      <select required {...register('Azure region', { required: true })}>
        {regions.map((region, index) => {
          return (
            <option key={index + 20} value={region}>
              {region}
            </option>
          );
        })}
      </select>

      <select
        required
        onChange={(e) => {
          getResources(e.target.value);
        }}>
        {resourceTypes.map((resource, index) => {
          return (
            <option key={index + 30} value={index}>
              {resource.type}
            </option>
          );
        })}
      </select>

      <div id='resources'>
        {resources.map((resource, index) => {
          return (
            <div key={index} id='resourceContainer'>
              <div id='resource'>
                <small>{resource.type}</small>
                {resource.type.includes('Storage account') ||
                resource.type.includes('Sql database Service Bus') ||
                resource.type.includes('Cosmos Database (sql)') ||
                resource.type.includes('Function app') ||
                resource.type.includes('App service') ? (
                  <button
                    onClick={() => {
                      addDuplicateResource(resource);
                    }}>
                    +
                  </button>
                ) : null}
              </div>
              <div>
                {resource.type.includes('Storage account') ||
                resource.type.includes('Sql database Service Bus') ||
                resource.type.includes('Cosmos Database (sql)') ||
                resource.type.includes('Function app') ||
                resource.type.includes('App service') ? (
                  <input
                    onChange={(e) => {
                      handleNameEdit(resource, e.target.value);
                    }}
                    id='nameEditor'
                    type='text'
                    placeholder={'Enter Name'}
                  />
                ) : (
                  <div style={{ Width: '80%' }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <input type='submit' />
    </form>
  );
};

export default Form;
