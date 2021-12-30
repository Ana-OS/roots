import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function OrderPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  // console.log(page)
  return (
    <div>
      {/* page we're in is passed via params */}
      <Pagination page={page || 1}/>
        <Products page={page || 1}/>
      <Pagination page={page || 1}/>
    </div>
  );
}
