const mongoose = require('mongoose')
const blogModel = require ('../models/blogModel')
const UserModel = require('../models/userModels')

//get all blogs
exports.getAllBlogsController = async ( req, res) => {
    try{
        const blogs = await blogModel.find({}).populate('user')
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
        const {title,description,image, user} = req.body
        //validation
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        const existingUser = await UserModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }
        const newBlog = new blogModel ({title,description,image,user})
        
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()

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
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.user.blogs.pull(blog);
    await blog.user.save();

    return res.status(200).send({
      success: true,
      message: 'Blog deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error deleting blog",
      error,
    });
  }
};


//get user blog
exports.userBlogController = async(req,res) => {
    try{
        const userBlog = await UserModel.findById(req.params.id).populate('blogs')
        if(!userBlog){
            return res.status(404).send({
                success:true,
                message:'blogs not found with this id'
            })
        }
        return res.status(200).send({
            success:true,
            message:'User blogs fetched',
            userBlog
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error fetching the user's blogs",
            error,
    })
}
}