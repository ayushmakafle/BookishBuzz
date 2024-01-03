const blogModel = require ('../models/blogModel')

//get all blogs
exports.getAllBlogsController = async ( req, res) => {
    try{
        const blogs = await blogModel.find({})
        if(!blogs){
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount : blogs.length,
            message: "All blogs list",
            blogs
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error getting blogs',
            error
        })
    }
}

//create blog
exports.createBlogController = async (req,res) => {
    try{
        const {title,description,image} = req.body
        //validation
        if(!title || !description || !image){
            return res.status(400).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        const newBlog = new blogModel ({title,description,image})
        await newBlog.save()
        return res.status(201).send({
            success:true,
            message:'blog created',
            newBlog
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error getting blogs',
            error
        })
    }
}

//update blogs
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While updating Blog",
      error,
    });
  }
};

//single blog
exports.getBlogByIdController = async(req,res) => {
    try{
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(200).send({
                success: false,
                message: 'The blog with the provided ID is not present or does not exist'
            })
        }
            return res.status(200).send({
                success:true,
                message:'Single blog fetched',
                blog
            })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error getting blog by id",
            error,
    })
}
}

//delete blog
exports.deleteBlogController = async(req,res) => {
    try{
        await blogModel.findOneAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'blog deleted'
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error deleting blog",
            error,
    })
}
}