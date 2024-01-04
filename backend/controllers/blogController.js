const mongoose = require('mongoose')
const blogModel = require ('../models/blogModel')
const UserModel = require('../models/userModels')
const multer = require('multer');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Middleware to handle file upload
const uploadImage = upload.single('image');

//read images
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

// get all blogs
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');

        if (!blogs || blogs.length === 0) {
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            });
        }

        // Convert Buffer data to data URI for each blog's image
        const blogsWithImageData = await Promise.all(
            blogs.map(async (blog) => {
                if (blog.image && blog.image.data) {
                    const dataUri = `data:${blog.image.contentType};base64,${blog.image.data.toString('base64')}`;
                    return { ...blog.toJSON(), image: { dataUri } };
                }
                return blog.toJSON();
            })
        );

        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All blogs list',
            blogs: blogsWithImageData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error getting blogs',
            error
        });
    }
};

// create blog
exports.createBlogController = async (req, res) => {
    try {
        // Use the upload middleware to handle file upload
        uploadImage(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    success: false,
                    message: 'Error uploading file',
                });
            } else if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error uploading file',
                });
            }

            const { title, description, user } = req.body;
            const image = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };

            // Validation
            if (!title || !description || !user) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all fields',
                });
            }

            const existingUser = await UserModel.findById(user);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Unable to find user',
                });
            }

            const newBlog = new blogModel({ title, description, image, user });

            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                await newBlog.save({ session });
                existingUser.blogs.push(newBlog);
                await existingUser.save({ session });
                await session.commitTransaction();
            } catch (error) {
                await session.abortTransaction();
                throw error;
            } finally {
                session.endSession();
            }

            return res.status(201).json({
                success: true,
                message: 'Blog created',
                newBlog,
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating blog',
            error,
        });
    }
};

// update blogs
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Use the upload middleware to handle file upload
        uploadImage(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    success: false,
                    message: 'Error uploading file',
                });
            } else if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error uploading file',
                });
            }

            let imageToUpdate = {};
            if (req.file) {
                imageToUpdate = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                };
            }

            const updatedBlog = await blogModel.findByIdAndUpdate(
                id,
                { title, description, image: imageToUpdate },
                { new: true }
            );

            return res.status(200).send({
                success: true,
                message: 'Blog Updated!',
                blog: updatedBlog,
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While updating Blog',
            error,
        });
    }
};

// single blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id).populate('user');

        if (!blog) {
            return res.status(200).send({
                success: false,
                message: 'The blog with the provided ID is not present or does not exist'
            });
        }

        // Convert Buffer data to data URI for the blog's image
        let blogWithImageData = blog.toJSON();
        if (blogWithImageData.image && blogWithImageData.image.data) {
            const dataUri = `data:${blogWithImageData.image.contentType};base64,${blogWithImageData.image.data.toString('base64')}`;
            blogWithImageData.image = { dataUri };
        }

        return res.status(200).send({
            success: true,
            message: 'Single blog fetched',
            blog: blogWithImageData
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error getting blog by id',
            error
        });
    }
};


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


// get user blog
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await UserModel.findById(req.params.id).populate({
            path: 'blogs',
            populate: {
                path: 'user',
                model: 'User'
            }
        });

        if (!userBlog) {
            return res.status(404).send({
                success: true,
                message: 'Blogs not found with this id'
            });
        }

        // Convert Buffer data to data URI for each blog's image
        const blogsWithImageData = await Promise.all(
            userBlog.blogs.map(async (blog) => {
                if (blog.image && blog.image.data) {
                    const dataUri = `data:${blog.image.contentType};base64,${blog.image.data.toString('base64')}`;
                    return { ...blog.toJSON(), image: { dataUri } };
                }
                return blog.toJSON();
            })
        );

        return res.status(200).send({
            success: true,
            message: "User blogs fetched",
            userBlog: { ...userBlog.toJSON(), blogs: blogsWithImageData }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error fetching the user's blogs",
            error,
        });
    }
};
