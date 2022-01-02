import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;
// LocalStateProvider and LocalStateContext allows us to save pieace of state that can be used by components without having to save this state info at a higher level and then pass it down through props

function CartStateProvider({ children }) {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer!

  // Closed cart by default
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{   // in this value we pass all the props we wnat to all the consumers that need them
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state from anywhere
function useCart() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart }; // this will then be impoted at a higher level (_app) so it will be automatically available to all consumers