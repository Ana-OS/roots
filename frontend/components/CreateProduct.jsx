import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';


const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION( # we need to name the mutation se we can use variables
    # Which variables are getting passed in? And What types are they
    $name: String! # the bang means that it is required
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: { #here we create data
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) { # here we list what we want it to return
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
    // hooking form to state
    // beacuse useForm returns an object with inouts, handleChange etc we can destructure it
  const { inputs, handleChange, clearForm, resetForm } = useForm();
    // useMutation it's what creates the new product with our form   
    // useMutation returns an obj that we destructure
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
        onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // submit inout fields to backkend
        await createProduct();
        clearForm();
        }}
    >
        <DisplayError error={error}/>
        <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="image">
                Image
                <input
                required
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                />
            </label>
            <label htmlFor="name">
                Name
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={inputs.name}
                onChange={handleChange}
                />
            </label>
            <label htmlFor="price">
                Price
                <input
                type="number"
                id="price"
                name="price"
                placeholder="price"
                value={inputs.price}
                onChange={handleChange}
                />
            </label>
            <label htmlFor="description">
                Description
                <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={inputs.description}
                onChange={handleChange}
                />
            </label>

            <button type="submit">Add Product</button>
        </fieldset>
    </Form>
  );
}