import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
//   useState (from React) it's what connects the form inouts to the state
  const [inputs, setInputs] = useState(initial);
  // between the time our initial state goes from nothing (while its loading)to the time it has the values from the object we need to kep those
  const initialValues = Object.values(initial).join('');
  console.log(initialValues)
  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  

  function handleChange(e) {
    let { value, name, type } = e.target;

    // make sure that the number in string is sent as an integer to graphql
    if (type === 'number') {
      value = parseInt(value);
    }
    //  if it's files than we make it an array
    if (type === 'file') {
        // destructure the first item in files and put it in value
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