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
    };

    // Get or create cart safely
    const cart = await getUserCart(userId);

    // Check if product already exists in cart
    const item = cart.items.find(
      (i) => i.productId.toString() === product.productId
    );

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
    console.log("--------------- userId", userId);
    

    try {

        const cartItems = await cartModal.findOne({ user:userId});




        console.log("********************",cartItems);
        
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




export const updateItemById = async(req, res, next) => {
    try {
      
        const { id, type } = req.params;

        if (!id || !type) return;
        
        if (type == "INCREMENT") {
            
        } else if (type == "DECREMENT") {
            
        } else {
            return;
        }



    } catch (error) {
        res.json({
            success: false,
            message: error?.message || "cannot update the item"
        })
  }
};


//-----------------------------------------------------------------------------------------


export const deleteItemById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const cartItem = await cartModal.findByIdAndDelete(id);

        res.status(201).json({
            success: true,
            message:"item removed successfully"
        })
    } catch (error) {
        
  }
};


// -------------------------------------------------------

export const clearCart = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}
