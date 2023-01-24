const User = require("../model/user.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const token_secret = process.env.TOKEN_KEY;


const findUser = async (data) => {
    let user = await User.findOne({ ...data });
    if (user) {
      return user;
    } else {
      return false;
    }
  };

const validateUser = async (data) => {
    let { email, password } = data;
    try {
      let user = await findUser({ email });
      
      if (user) {
        if (await argon2.verify(user.password, password)) {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
  


// Login callback
const loginUser = async (req, res) => {
    let { email, password } = req.body;

    if(email.includes("@masaischool.com")){
  
      let hash = await argon2.hash(password);
  
      let user = await User.create({email,password:hash,isAdmin:true});
  
      if(user){

        let token = jwt.sign(
          {id:user._id, email: user.email,isAdmin:user.isAdmin},
          token_secret,
          {
            expiresIn: "7 days",
          }
        );
    
         res.status(200)
         .send({ status: true, token });
      }
    }else{

      let user = await validateUser({ email, password });
    
  
      if (user ) {
        let token = jwt.sign(
          {id:user._id, email: user.email,isAdmin:user.isAdmin},
          token_secret,
          {
            expiresIn: "7 days",
          }
        );
    
         res.status(200)
         .send({ status: true, token });
      } else {
        return res.status(400).send({ status: false, message: "something went wrong" });
      }
    }
    
  };


module.exports={loginUser}