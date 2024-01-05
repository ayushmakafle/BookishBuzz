const UserModel = require("../models/userModels")
const bcrypt = require('bcrypt')

//user register
exports.registerController = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    // Validation
    if (!username) {
      return res.status(400).send({
        success: false,
        message: 'Username is required'
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: 'Email is required'
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: 'Password is required'
      });
    }

    // Existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: 'User already exists'
      });
    }
    const hashedPassword = await bcrypt.hash(password,10)
    // Save new user
    const user = new UserModel({ username, email, password:hashedPassword });
    await user.save();

    return res.status(201).send({
      success: true,
      message: 'New user created',
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'Error in register callback',
      success: false,
      error: error.message
    });
  }
};


//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "login successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callback",
      error,
    });
  }
};



//get all users
exports.getAllUsers = async(req,res) => {
  try{
    const users = await UserModel.find({})
    return res.status(200).send({
      userCount: users.length,
      success:true,
      message:'all users data',
      users,
    })
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"error in getting all users",
      error
    })
  }
}