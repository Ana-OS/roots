import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    #  graphQL method delete prouduct
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// item is deleted from db but not cache som we need to force it
// we could also use the refetch query
function update(cache, payload) { // payload is the result of the mutation - the deleted item so we can remove it from cache
    // console.log(payload);
    // console.log('running the update function after delete');
    // identify the item in the cache "cache.identify" and evict them. this is Apollo
    cache.evict(cache.identify(payload.data.deleteProduct));
  }

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete it
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}