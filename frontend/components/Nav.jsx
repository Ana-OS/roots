import Link from 'next/link';
import SignOut from './SignOut';
import CartCount from './CartCount';
import NavStyles from './styles/NavStyles';
import { useCart } from '../lib/cartState';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && ( //if there's a user then show these tabs
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            Cart
            <CartCount
              count={user.cart.reduce(
                (sum, cartItem) => sum + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && ( // if no user then it has to sign in
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}