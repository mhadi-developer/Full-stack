import  cartModal  from  "../Modals/CartModal/cart.modal.js";



export const addProductToCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const body = req.body;

    const product = {
      productId: body._id,
      title: body.title,
      price: body.discountPrice,
      quantity: body.quantity || 1,
      image: body.mainImage
    };

    // Get or create cart safely
    const cart = await getUserCart(userId);

    // Check if product already exists in cart
    const item = cart.items.find(
      (item) => item.productId.toString() === product.productId.toString()
    );


    console.log("found item on product id in Add to cart ---->", item);
    

    if (item) {
      item.quantity += product.quantity;
    } else {
      cart.items.push(product); // push object, not array
    }

    await cart.save();

    res.status(201).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Could not add item to cart",
    });
  }
};

//--------------------------------------------------------------------
const getUserCart = async (userId) => {
  try {
    // First try to find existing cart
    let cart = await cartModal.findOne({ user: userId });

    if (!cart) {
      // Use try/catch to safely create new cart and handle race condition
      try {
        cart = await cartModal.create({ user: userId, items: [] });
      } catch (err) {
        if (err.code === 11000) {
          // Cart already created by another request, fetch it
          cart = await cartModal.findOne({ user: userId });
        } else {
          throw err; // other errors
        }
      }
    }

    return cart;
  } catch (error) {
    console.log("getUserCart error =>", error.message);
    throw new Error(error.message); // propagate to main controller
  }
};


//------------------------------------------------------------
export const getAllCartItemsByUser = async (req, res, next) => { 
    
    const { userId } = req.params;
    

    try {

        const cartItems = await cartModal.findOne({ user:userId});



        
        res.status(200).json({
            success: true,
          data : cartItems?.items || []
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error?.message || "cannot fetch from cart"
        })
    }
};
//---------------------------------------------------------------



export const getSingleItemFromCart = async(req, res, next) => {
    try {
        
        const { id } = req.params;

        const foundedItem = await cartModal.findById(id);

        res.status(200).json({
            success: true,
            foundedItem
        })


    } catch (error) {
        
        res.json({
            message: error?.message || "something went wrong to get item"
        })
    }
}

//-------------------------------------------------------------------------------------



 export const incrementCartProductQuntity = async (req, res) => {
   try {
    
     const { userId } = req.params;
     const { productId } = req.body;

     // geting the user cart from user defined function
 
     const cart = await getUserCart(userId);
     const item = cart.items.find(i => i.productId.toString() === productId);

     if (item) {
       item.quantity += 1;
     }

     await cart.save();

     res.status(200).json(cart);

  } catch (error) {
    
     res.status(500).json({error: error.message});
  } 
}

// ******************************

export const decrementCartProductQuntity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const id = productId.productId; // string from frontend

    const cart = await getUserCart(userId);
    console.log("----->", cart);

    const item = cart.items.find((i) => i.productId.equals(id));

    console.log("item with decrease id", item);

    if (item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        cart.items = cart.items.filter((i) => !i.productId.equals(id));
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      error: error?.message || "something went wrong",
    });
  }
};


//-----------------------------------------------------------------------------------------


export const removeItemFromCart = async (req, res, next) => {

  // for removing item ,, UseriD in params and productId in body
  const { userId } = req.params;
    try {
     
      const { productId } = req.body;
     
      console.log("************ removeItem from cart");
    

      let cart = await getUserCart(userId);

      
      if (!cart) {
        res.status(404).json({
          message:"not founded , plaese add product"
        })
      }
      console.log("item productId", cart.items);
     

     cart.items = cart.items.filter(
       (item) => item.productId.toString() !== productId.toString(),
     );

      
      console.log("cart after removing item----> ",cart.items );
      
      
      await cart.save();

        res.status(201).json({
            success: true,
          message: "item removed successfully",
            data:cart
        })
    } catch (error) {
      res.json({
        success: false,
        message: error
        })
  }
};


// -------------------------------------------------------

export const clearCart = async(req, res, next) => {
    try {
          
      const { userId } = req.params;

      const cart = await getUserCart(userId);

      cart.items = [];

      await cart.save();
      
      res.status(200).json({
        success: true,
        message: `cart item removed of user:${userId}`
      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "something went wrong"
        })
    }
}
