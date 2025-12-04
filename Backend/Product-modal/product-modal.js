import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    discription:String
})
const ProductModal = mongoose.model('Product', productSchema);
export default ProductModal;