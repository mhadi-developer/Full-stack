export const getAllProducts = (req,res)=>{
  res.json({message:'product endpoint called'})
}

export const getProductsById = (req,res)=>{
  res.json({message:'single product endpoint called'})
}

export const updateProduct = (req,res)=>{
  res.json({message:' product update endpoint called'})
}
export const deleteProduct = (req,res)=>{
  res.json({message:' product delete endpoint called'})
}