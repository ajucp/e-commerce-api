const jwt=require('jsonwebtoken');
require('dotenv').config();

const AuthMiddleware={
    authenticateToken(req,res,next){
        // console.log("Authorization Header:", req.headers.authorization);

        const authHeader=req.headers['authorization'];
        const token=authHeader && authHeader.split(' ')[1];

        if(!token)
            return res.status(401).json({message:'ACCESS TOKEN REQUIRED!!'});

        jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,user)=>{
            if(err)
                return res.status(403).json({message:'INVALID OR EXPIRED TOKEN'});

            req.user=user;
            next();

        });
    },
    
    authorizeRoles(...roles){
        return(req,res,next)=>{
            console.log("User roles from token:", req.user); 
            if(!roles.includes(req.user.role))
                return res.status(403).json({message:'FORBIDDEN: INSUFFICIENT PERMISSIONS'});

            next();
        };
    },
}

module.exports=AuthMiddleware;