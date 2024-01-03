const express = require('express')
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController } = require('../controllers/blogController')

//router object
const router = express.Router()

//get all blog
router.get('/all-blog',getAllBlogsController)

//create blog
router.post('/create-blog',createBlogController)

//update blog
router.put('/update-blog/:id',updateBlogController)

//single blog details
router.get('/get-blog/:id',getBlogByIdController)

//delete blog
router.delete('/delete-blog/:id',deleteBlogController)

module.exports = router