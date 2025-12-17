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
  
  const {title , isPublic} = req.body;
  const fileData = req.file;
  const img = {
    public_id: fileData.filename,
    secure_url: fileData.path
  };

  const data = {
    title,
    image: img,
    isPublic:isPublic
  }


   

  await CategoryModal.create(data);

  console.log(" Category added");
  console.log(`Recieved data ${JSON.stringify(data)}`);
 
   return res.status(200).json({
     success: true,
     message: "Category created",
   });
  


 
}
  //  // create new category in database




// Each function interacting with CategoryModal Function to perform "CURD (Create , update , read , delete)" operations in database.
