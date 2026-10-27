import { createContext, useState, useEffect  } from "react";

// Create Context
export const CartContext = createContext();

// Create Provider
const CartProvider = ({ children }) => {


  const getCartKey = (id) => {
    return id ? `cart_${id}` : "guestCartItems";
  };

  const getCustomerId = () => {
    const customer = JSON.parse(
      localStorage.getItem("customer") || "null"
    );

    return customer?.id || null;
  };

  const [customerId, setCustomerId] = useState(getCustomerId);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(
      getCartKey(getCustomerId())
    );

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartLoaded, setCartLoaded] = useState(true);

  // Detect customer login and logout
  useEffect(() => {
    const handleCustomerChange = () => {
      const nextCustomerId = getCustomerId();

      if (nextCustomerId === customerId) return;

      // Save the current cart under the previous customer
      localStorage.setItem(
        getCartKey(customerId),
        JSON.stringify(cartItems)
      );

      // Load the new customer's cart
      const savedCart = localStorage.getItem(
        getCartKey(nextCustomerId)
      );

      setCartLoaded(false);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      setCustomerId(nextCustomerId);
      setCartLoaded(true);
    };

    window.addEventListener(
      "customerLogin",
      handleCustomerChange
    );

    return () => {
      window.removeEventListener(
        "customerLogin",
        handleCustomerChange
      );
    };
  }, [customerId, cartItems]);

  // Save cart changes for the active customer
  useEffect(() => {
    if (!cartLoaded) return;

    localStorage.setItem(
      getCartKey(customerId),
      JSON.stringify(cartItems)
    );
  }, [cartItems, customerId, cartLoaded]);















  
//       const getCartKey = () => {
//     const customer = JSON.parse(
//       localStorage.getItem("customer") || null
//     );
//     return customer?.id
//     ? `cart_${customer.id}`
//     : "guestCartItems";
//   };


//   const [customerId, setCustomerId] = useState(() => {
//   const customer = JSON.parse(
//     localStorage.getItem("customer") || "null"
//   );

//   return customer?.id || null;
// });
// const [cartLoaded, setCartLoaded] = useState(false);


//   const [cartItems, setCartItems] = useState(() =>{
//     const savedCart = localStorage.getItem(getCartKey());
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

  
// useEffect(() => {
//   if (!cartLoaded) return;

//   const cartKey = customerId
//     ? `cart_${customerId}`
//     : "guestCartItems";

//   localStorage.setItem(
//     cartKey,
//     JSON.stringify(cartItems)
//   );
// }, [cartItems, customerId, cartLoaded]);



//   useEffect(() => {
//   const handleCustomerLogin = () => {
//     const customer = JSON.parse(
//       localStorage.getItem("customer") || "null"
//     );

//     setCustomerId(customer?.id || null);
//   };

//   window.addEventListener("customerLogin", handleCustomerLogin);

//   return () => {
//     window.removeEventListener("customerLogin", handleCustomerLogin);
//   };
// }, []);



// useEffect(() => {
//   setCartLoaded(false);

//   const cartKey = customerId
//     ? `cart_${customerId}`
//     : "guestCartItems";

//   const savedCart = localStorage.getItem(cartKey);

//   setCartItems(savedCart ? JSON.parse(savedCart) : []);
//   setCartLoaded(true);
// }, [customerId]);


  const addToCart = (product) => {
  // Check if the product already exists
  const existingProduct = cartItems.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {

    // Increase quantity
    setCartItems(
      cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + (product.quantity || 1),
            }
          : item         
      )
    );
    alert(`product quantity increase successfully `)

     
    

  } else {

    // Add new product
    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: product.quantity || 1,
      },
    ]);
  alert("Product add successfully")

  }
};





// Remove Product
const removeItem = (id) => {

  setCartItems(
    cartItems.filter(
      (item) => item.id !== id
    )
  );

};

const subtotal = cartItems.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

const totalItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);


// Increase Quantity
const increaseQuantity = (id) => {

  setCartItems(
    cartItems.map((item) =>
      item.id === id
      ?
      {
        ...item,
        quantity: item.quantity + 1
      }
      :
      item
    )
  );

};


// Decrease Quantity
const decreaseQuantity = (id) => {

  setCartItems(
    cartItems.map((item) =>
      item.id === id && item.quantity > 1
      ?
      {
        ...item,
        quantity: item.quantity - 1
      }
      :
      item
    )
  );

};
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        subtotal,
        totalItems
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;