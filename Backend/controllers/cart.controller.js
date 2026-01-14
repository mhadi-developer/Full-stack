import cartModal from "../Modals/CartModal/cart.modal";




export const addProductToCart = async(req, res, next) => {
    try {
        const item = req.body;
        const addedItem = await cartModal.create(item);

        res.status(201).json({
            success: true,
            addedItem
        })



    } catch (error) {
        res.json({
            success:false,
            message: error?.message || "could not added item in cart something went wrong"
        })
  }
};


//------------------------------------------------------------
export const getAllCartItems = async(req, res, next) => { 
    try {

        const cartItems = await cartModal.find({});
        res.status(200).json({
            success: true,
           cartItems
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



  } catch (error) {}
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
