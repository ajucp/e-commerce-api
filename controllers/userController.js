const UserService=require('../services/userService')

exports.register=async(req,res)=>{
    console.log('REGISTER USER CONTROLLER');
    try {
        const user=req.body;
        
        const userId=await UserService.registerUser(user);
        res.status(201).json({message:'USER REGISTERED SUCCESSFULLY',id:userId});

    } catch (err) {
        res.status(400).json({message:err.message});
    }
}

exports.login=async(req,res)=>{
    console.log('LOGIN USER CONTROLLER');
    try {

        const {username,password}=req.body;
        console.log('username: ',username,'password: ',password);

        const {token,userId}=await UserService.loginUser(username,password);
        res.json({message:'LOGIN SUCCESSFULLY',token,userId});
        
    } catch (err) {
        res.status(401).json({message:err.message})
    }
}

exports.getUser=async(req,res)=>{
    console.log('GET USER CONTROLLER');
    try {
        const userId=req.params.id;
        const user=await UserService.getUserById(userId);
        console.log(user)
        res.json(user);
    } catch (err) {
        res.status(404).json({message:err.message})
    }
}

exports.updateUser=async(req,res)=>{
    console.log('UPDATE USER CONTROLLER');
    try {
        const userId=req.params.id;
        const userAddress=req.body.address;

        const updated=await UserService.updateUser(userId,userAddress);
        res.json({message:'USER UPDATED SUCCESSFULLY',
            updatedUser:updated
        });

    } catch (err) {
        res.status(404).json({message:err.message})
    }
}