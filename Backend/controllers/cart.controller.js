import  cartModal  from  "../Modals/CartModal/cart.modal.js";




export const addProductToCart = async(req, res, next) => {
    try {
        const item = req.body;
        const { userId } = req.params;
        
        console.log({
            userId,
             item
        });



        const product = {
            productId:item._id,
            title: item.title,
            price: item.discountPrice,
            quantity: item.quantity


        }




        console.log("*************^^^^^^^^^^^",product);
        
        // first find all the cart items of user if exist (final return is array... compatable with schema)
        const cartItems = cartModal.findById({ userId });
        
         console.log("&&&&&&&&&&&&&&&&&& carItems", cartItems);
         

        // const addedItem = await cartModal.create(item);

        res.status(201).json({
            success: true,
            // addedItem
        })



    } catch (error) {
        res.json({
            success:false,
            message: error?.message || "could not added item in cart something went wrong"
        })
  }
};


//------------------------------------------------------------
export const getAllCartItemsByUser = async(req, res, next) => { 
    try {
        const { userId } = req.params;
        console.log("+++++++++++userId", userId);


        const cartItems = await cartModal.find({userId});




        console.log("********************",cartItems);
        
        res.status(200).json({
            success: true,
          data : cartItems
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
