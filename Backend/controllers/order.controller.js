import orderModal from "../Modals/OrderModal/order.modal.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModal.find({});
        console.log("&&&&&&&&&&&---orders from DB------******", orders);
        
        res.status(200).json({
            orders
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error?.message || "something went wrong Server error........"
        })
        
    }
    
}
//-----------------------------------------------------

export const getOrderById = async(req, res) => { 
    try {
         
        const { id } = req.params;
        const orderById = await orderModal.findById(id);

        console.log(" **************--Order Find By ID (DB)-- ***********", orderById);

        res.status(200).json({
            orderById
        });
        

     } catch (error) {
       console.log(error);
       res.status(500).json({
         message: error?.message || "something went wrong Server error........",
       });
     }
};

//-------------------------------------------------


export const updateOrderById = async (req, res) => {
    try {
         
        const { id } = req.params;
        const data = req.body;

        const updatedOrderById = await orderModal.findByIdAndUpdate(id, data)
        
        console.log("-----updated order-----", updateOrderById);


        res.status(200).json({
            updatedOrderById
        })



     } catch (error) {
       console.log(error);
       res.status(500).json({
         message: error?.message || "something went wrong Server error........",
       });
     }
 };

//-----------------------------------------------


export const deleteOrderById = async(req,res) => { 
    try {
         

        const { id } = req.params;
        const deletedOrder = await orderModal.findByIdAndDelete(id);

        console.log("-----deleted order------", deletedOrder);

        res.status(200).json({
            deletedOrder
        })
        
     } catch (error) {
       console.log(error);
       res.status(500).json({
         message: error?.message || "something went wrong Server error........",
       });
     }
}
