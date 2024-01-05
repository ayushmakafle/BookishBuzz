const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        data: {
            type: Buffer, 
            required: [true, 'Image data is required']
        },
        contentType: {
            type: String,
            required: [true, 'Image contentType is required']
        }
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    }
}, { timestamps: true });

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;
