import Pagination from '../components/Pagination';
import Products from '../components/Products';

export default function OrderPage() {
  return (
    <div>
      {/* page we're in is passed via params */}
      <Pagination page={}/>
        <Products />
      <Pagination page={}/>
    </div>
  );
}