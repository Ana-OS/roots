import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
//   useState (from React) it's what connects the form inouts to the state
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  // {
  //   name: 'wes',
  //   description: 'nice shoes',
  //   price: 1000
  // }

  function handleChange(e) {
    let { value, name, type } = e.target;

    // make sure that the number in string is sent as an integer to graphql
    if (type === 'number') {
      value = parseInt(value);
    }
    //  if it's files than we make it an array
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    //   reset form to the initial state
    setInputs(initial);
  }

  function clearForm() {
    //   map over the inputs which are our initial state
    // object.fromEntries turns the array that resulted from Object.entries back to an obj
    const blankState = Object.fromEntries(
        // return the key but change the value to be an empty string
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}