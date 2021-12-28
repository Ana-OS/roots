// the file with [] in the name is specific to next.js and it means that this template is to be used by anything that has this product/[...]. It return whatever comes after "product/"  in a query param

import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}