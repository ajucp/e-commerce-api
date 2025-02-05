const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const User=require('../models/userModel');

const registerUser=async(user)=>{
    const {username,password,email,address}=user;

    const existingUser=await User.getUserByUsername(username);

    if(existingUser) throw new Error("USER ALREADY EXISTS ");

    const existingEmail=await User.getUserByEmail(email);
    if(existingEmail)throw new Error("EMAIL ALREADY EXISTS ");
    

    const hashedPassword=await bcrypt.hash(password,10);
    return await User.createUser(username,hashedPassword,email,address);
    
}
const loginUser=async(username,password)=>{

    const user=await User.getUserByUsername(username);
    if(!user) throw new Error("USER NOT FOUND");

    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid) throw new Error("INVALID PASSWORD");

    const token=jwt.sign(
        {id:user.id,username:user.username,role:user.role},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn:'1h'}
    );

    return {token,userId:user.id}  
    
}

const getUserById=async(id)=>{

    const user=await User.getUserById(id);
    if(!user) throw new Error("USER NOT FOUND");
    return user;

}
const updateUser=async(id,address)=>{
    const updated=await User.updateUser(id,address);

    if(updated===0)throw new Error("USER NOT FOUND OR NO CHANGES MADE");
    return updated
}

module.exports={registerUser,loginUser,getUserById,updateUser}