import useForm from '../lib/useForm';

export default function CreateProduct() {
    // hooking form to state
    // beacuse useForm returns an object with inouts, handleChange etc we can destructure it
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice Plant',
    price: 34234,
    description: 'This is the best palnt!',
  });
  return (
    <form>
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

      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}