const User = require("../model/user.model");
const argon2 = require("argon2");



//Signup callback
const signupUser = async (req, res) => {
    let {email,password,name,isAdmin} = req.body;
    let already_exist = await User.findOne({ email: email });
    if (already_exist) {
      return res.status(400).send({status:false,message:"user already registered"});
    }
    let hash = await argon2.hash(password);

    let user = await User.create({name,email,password:hash,isAdmin});
    if (user) {
      return res.status(201).send({ status: true,user:email, message: "user created successfully" });
    } else {
      return res.send({ status: false, message: "wrong details" });
    }
  };


module.exports={signupUser}