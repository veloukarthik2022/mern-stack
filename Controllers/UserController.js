
const sha1 = require('sha1');
const UserModel = require('../Model/UserModel');
const jwt = require('jsonwebtoken');


const maxTime = 1800;

const Login  = async (req,res) =>{
        const {email,password} = req.body;
        let encrypt = sha1(password);
        let check = await UserModel.find({email:email,password:encrypt}).select('-password');

       if(check.length>0)
       {
        let tokens = createToken(check.email)
        let token_update = await UserModel.findOneAndUpdate({email:email},{token:tokens},{new:true});
        if(token_update)
        {
                res.status(200).json({message:"you are successfully logged in "+check[0].name,user:token_update});
        }
        else
        {
                res.status(201).json({message:"you are token not update"});
        }
        
       }
       else
       {
        res.status(400).json({error:"Please use the correct credentials "});
       }
}
const Register = async (req,res) =>{
        const {name,email,mobile,password} = req.body;
        let encrypt = sha1(password);
        let check = await UserModel.find({email:email});

       if(check.length>0)
       {
        res.status(400).json({error:"User already registered"});
       }
       else
       {
        let tokens = createToken(email)
        let user = await UserModel.create({
                name:name,
                email:email,
                mobile:mobile,
                password:encrypt,
                token:tokens
        })
        res.status(200).json(user);
       }
}
const createToken = (data) =>{
        return jwt.sign({data},'mern stack tokens',{expiresIn:maxTime});
}


module.exports = {Login,Register}