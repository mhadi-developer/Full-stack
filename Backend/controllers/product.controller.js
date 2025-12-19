import ProductModal from '../Modals/Product-modal/product-modal.js'

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


export const createProduct = async (req, res) => {
  const sendData = req.body;
  const images = req.files;

  const mainImage = {
    public_id: images.mainImage[0].filename,
    secure_url: images.mainImage[0].path,
  };

  const galleryImages = images.galleryImages.map((gImageObj) => {
    return {
      public_id: gImageObj.filename,
      secure_url: gImageObj.path,
    }; // map will check all the images which are recieving as a object and make it available in gImgObj
    // and in all iterations return filename , and path from the recieve object from front end , to match with DB schema
  });

  // Normalize sizes
  sendData.sizes = Array.isArray(sendData.sizes)
    ? sendData.sizes.map((s) => JSON.parse(s))
    : [JSON.parse(sendData.sizes)];

  // Normalize colors
  sendData.colors = Array.isArray(sendData.colors)
    ? sendData.colors.map((c) => JSON.parse(c))
    : [JSON.parse(sendData.colors)];

  sendData.mainImage = mainImage; // creating new feilds in form data
  sendData.galleryImages = galleryImages;

  console.log("********data from front end", sendData);

  await ProductModal.create(sendData);
  res.json({
    message: "create product is called",
  });
}
// } // create new product in database




// Each function interacting with ProductModal Function to perform "CURD (Create , update , read , delete)" operations in database.
