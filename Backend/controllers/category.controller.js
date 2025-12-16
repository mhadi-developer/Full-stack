import CategoryModal from '../Modals/Category-modal/category-modal.js'







export const getAllCategories = async (req,res)=>{
  const categories = await CategoryModal.find({})
  res.json(categories);
  } // fetch all categories from database

export const getCategoryById = async (req,res)=>{
  const {id} = req.params;
 const category = await CategoryModal.findById(id);

  res.json({
    message: 'single category endpoint called',
    category
  })
} // fetch single category by id from database

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await CategoryModal.findByIdAndUpdate(id, data);
  res.json({
    message: `category with id ${id} is updated`,
  data:data})
} // update category by id in database


export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await CategoryModal.findByIdAndDelete(id)
  res.json({message:`category with id ${id} is deleted`})
} // delete category by id in database


export const createCategory = async (req, res) => {
  
  const data = req.body;
  const fileData = req.file;
  
  console.log(" hello you have called add category endpoint");
  console.log(`Recieved data ${JSON.stringify(data)}`);
  console.log(`recieved image ${JSON.stringify(fileData)}`);
  
   return res.status(200).json({
     success: true,
     message: "Category created",
   });
  
  // const sendData = req.body;


  // await CategoryModal.create(sendData);
  // res.json({message:'create category is called',
  //   data:sendData
  // console.log(sendData);
}
  //  // create new category in database




// Each function interacting with CategoryModal Function to perform "CURD (Create , update , read , delete)" operations in database.
