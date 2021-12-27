import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
    // hooking form to state
    // beacuse useForm returns an object with inouts, handleChange etc we can destructure it
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice Plant',
    price: 34234,
    description: 'This is the best palnt!',
  });
  return (
    <Form
        onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
        }}
    >
        <fieldset>
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