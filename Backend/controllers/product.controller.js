export const getAllProducts = (req,res)=>{
   const qData = req.query;
  res.json({message:'product endpoint called',
    qData:qData
  })

  console.log(qData);
  
   
}

export const getProductsById = (req,res)=>{
  const paramData =req.params;
  res.json({message:'single product endpoint called',
    paramData:paramData
  })

  console.log(paramData);
  
}

export const updateProduct = (req,res)=>{
  res.json({message:' product update endpoint called'})
}
export const deleteProduct = (req,res)=>{
  res.json({message:' product delete endpoint called'})
}
export const createProduct = (req,res)=>{
  const sendData = req.body;
  res.json({message:'creste product is called',
    data:sendData
  })
  
  console.log(sendData);
}