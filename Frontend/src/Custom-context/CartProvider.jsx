import React, { use } from 'react'
import { createContext ,useState  , useContext , useReducer} from 'react'


const CartContext = createContext();



const cartReducer = (state, action) => {
  switch (action.type) {
      case "ADD_TO_CART": {
          action.payload.quantity = 1;
          const cartItem = action.payload;
         
      console.log("Previous State:", state);
      console.log("Add to cart:", cartItem);

      //   return [...state, cartItem];
      
      // checking if same item is already  added to cart , if it exist increase its quantity only ;
      const existingItem = state.find(item => item._id == cartItem._id);
      // add product in DB










// adding product in global context state/memory
      if (existingItem) {
       state.map((item) => {
          return item._id == cartItem._id ?
            { ...item, quantity: item.quantity + 1 } : item;
        }
        )
      }
      else {
        const newState = [...state, { ...cartItem , quantity:1}];
        return newState;
      }
      
      
  
         
          
    }

    case "REMOVE_FROM_CART": {
      const _id = action.payload;

          const newState = state.filter((item) => item._id !== _id);
          return newState;
    }

    case "CLEAR_CART": {
      return [];
    }

    case "INCREMENT_CART": {
      const id = action.payload._id;

      const newState = state.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          );

          console.log("increaSed qynty............", newState);
          
          return newState;
    }

    case "DECREMENT_CART": {
      const id = action.payload._id;

      const newState = state.map((item) =>
        item._id === id && item.quantity > -1
          ? { ...item, quantity: item.quantity - 1 }
          : item
          );
          const filteredState = newState.filter(item => !(item.quantity == 0)); //removing the item with 0 qnty from cart list 

           filteredState;
          console.log("**********decrease qnty******", filteredState);
          
          return filteredState;
    }

      default:
          return state;
  }
};
 // reducer always have to return newstate based on action type.



const CartProvider = ({ children }) => {
    
    const [cart, setCart] = useState([]);

    
    const [  cartState , dispatch] = useReducer(cartReducer, cart); // useReducer hook for cart state managment (complex state managment)


    //defining actions for cart Reducer

    const AddToCart = (product) => dispatch({ type: 'ADD_TO_CART' , payload: product});
    const RemoveFromCart = (_id) => dispatch({ type: 'REMOVE_FROM_CART', payload: _id });
    const ClearCart = () => dispatch({ type: 'CLEAR_CART' });
    const IncreamentCart = (productId) =>
      dispatch({ type: "INCREMENT_CART", payload: productId });
    const DecrementCart = (productId) =>
      dispatch({ type: "DECREMENT_CART", payload: productId });



  return (
    <CartContext.Provider
      value={{
        cartState,
        setCart,
        AddToCart,
        RemoveFromCart,
        IncreamentCart,
        DecrementCart,
        ClearCart,
      }}
    >
      {children}
    </CartContext.Provider> // providing cart Context using provider component and concept of children prop.
  );
}

export default CartProvider;

export const useCart = () => useContext(CartContext);     // custom hook to use cart context


