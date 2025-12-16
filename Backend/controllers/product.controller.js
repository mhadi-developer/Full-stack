import {ProductModal} from '../Modals/Product-modal/product-modal.js'

export const getAllProducts = async (req,res)=>{
  const products = await ProductModal.find({})
  res.json(products);
  } // fetch all products from database

export const getProductsById = async (req,res)=>{
  const {id} = req.params;
 const product = await ProductModal.findById(id);

  res.json({
    message: 'single product endpoint called',
    product
  })
} // fetch single product by id from database

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await ProductModal.findByIdAndUpdate(id, data);
  res.json({
    message: `product with id ${id} is updated`,
  data:data})
} // update product by id in database


export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductModal.findByIdAndDelete(id)
  res.json({message:`product with id ${id} is deleted`})
} // delete product by id in database


export const createProduct = async (req,res)=>{
  const sendData = req.body;
  await ProductModal.create(sendData);
  res.json({message:'create product is called',
    data:sendData
  })
  console.log(sendData);
} // create new product in database




// Each function interacting with ProductModal Function to perform "CURD (Create , update , read , delete)" operations in database.
