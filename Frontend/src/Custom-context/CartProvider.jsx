import React, { use } from 'react'
import { createContext ,useState  , useContext , useReducer} from 'react'


const CartContext = createContext();



const cartReducer = ( state , action ) => {
    
    if (action.type == 'ADD_TO_CART') {
      console.log("add to cart action/ dispatcher called");
      
    }
    else if (action.type == ' REMOVE_FROM_CART') {
        console.log(" remove from the cart dispatcher called ");
        
        
    }
   else if (action.type == 'CLEAR_CART') {
        
    }
   else if (action.type == 'INCREAMENT_CART') {
        
    }
   else if (action.type == 'DECREMENT_CART') {
        
    }

    else {
        throw new Error(' Invalid Action type');
    }

}



const CartProvider = ({ children }) => {
    
    const [cart, setCart] = useState([]);

    
    const [  state , dispatch] = useReducer(cartReducer, cart);


    //defining actions for cart Reducer

    const AddToCart = () => dispatch({ type: 'ADD_TO_CART' });
    const RemoveFromCart = () => dispatch({ type: 'REMOVE_FROM_CART' });
    const ClearCart = () => dispatch({ type: 'CLEAR_CART' });
    const IncreamentCart = () => dispatch({ type: 'INCREAMENT_CART' });
    const DecrementCart = () => dispatch({ type: 'DECREMENT_CART' });



  return (
      <CartContext.Provider value={{ cart , setCart, AddToCart, RemoveFromCart , IncreamentCart, DecrementCart, ClearCart}}>
          {children}       
      </CartContext.Provider> // providing cart Context using provider component and concept of children prop.
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);     // custom hook to use cart context


