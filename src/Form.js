import React from 'react';
import { useForm } from 'react-hook-form';
import RemoveIcon from './assets/remove.svg';

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
  const getResources = (e) => {
    e.preventDefault();
    const value = resourceTypes[e.target.value];
    const duplicate = resources.find(
      (resource) => resource.type === value.type
    );
    if (!duplicate) {
      setResources([...resources, value]);
    }
  };

  // This function adding any resource multiple time to the list
  const addDuplicateResource = (e, input) => {
    e.preventDefault();
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

  // Remove any selected resources from the list
  const removeResources = (e, item) => {
    e.preventDefault();
    const newList = resources.filter((resource) => resource !== item);
    setResources(newList);
  };

  return (
    <form id='mainForm' onSubmit={handleSubmit(onSubmit)}>
      <h2>New infrastructure selector</h2>
      <input
        required
        type='text'
        placeholder='Application name'
        {...register('Application name', { required: true })}
      />
      <select
        required
        {...register('Azure devops project', { required: true })}>
        <option selected disabled>
          Select azure devops project
        </option>
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
        <option selected disabled>
          Select azure region
        </option>
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
          getResources(e);
        }}>
        <option selected disabled>
          Select resources
        </option>
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
                <img
                  onClick={(e) => removeResources(e, resource)}
                  src={RemoveIcon}
                  id='RemoveIcon'
                  alt='RemoveIcon'
                />
                <small>{resource.type}</small>
                {resource.type.includes('Storage account') ||
                resource.type.includes('Sql database Service Bus') ||
                resource.type.includes('Cosmos Database (sql)') ||
                resource.type.includes('Function app') ||
                resource.type.includes('App service') ? (
                  <button
                    onClick={(e) => {
                      addDuplicateResource(e, resource);
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
                  resource.type.includes('Sql database Service Bus') ||
                  resource.type.includes('Cosmos Database (sql)') ||
                  resource.type.includes('Function app') ||
                  resource.type.includes('App service') ? (
                    <input
                      required
                      onChange={(e) => {
                        handleNameEdit(resource, e.target.value);
                      }}
                      id='nameEditor'
                      type='text'
                      placeholder={'Enter Name*'}
                    />
                  ) : (
                    <input
                      onChange={(e) => {
                        handleNameEdit(resource, e.target.value);
                      }}
                      id='nameEditor'
                      type='text'
                      placeholder={'Enter Name'}
                    />
                  )
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
