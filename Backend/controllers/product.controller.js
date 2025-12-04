import ProductModal from '../Product-modal/product-modal.js'

export const getAllProducts = async (req,res)=>{
  const products = await ProductModal.find({})
  res.json({message:'product endpoint called', products
  })
}

export const getProductsById = (req,res)=>{
  const paramData =req.params;

  res.json({message:'single product endpoint called',
    paramData:paramData,
  })
  console.log(paramData);
}

export const updateProduct = (req,res)=>{
  res.json({message:' product update endpoint called'})

}


export const deleteProduct = (req,res)=>{
  res.json({message:' product delete endpoint called'})
}


export const createProduct = async (req,res)=>{
  const sendData = req.body;
  await ProductModal.create(sendData);
  res.json({message:'creste product is called',
    data:sendData
  })
  console.log(sendData);
}