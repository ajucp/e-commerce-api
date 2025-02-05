const jwt=require('jsonwebtoken');
require('dotenv').config();

const AuthMiddleware={
    authenticateToken(req,res,next){

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
            if(!roles.includes(req.user.roles))
                return res.status(403).json({message:'FORBIDDEN: INSUFFICIENT PERMISSIONS'});

            next();
        };
    },
}

module.exports=AuthMiddleware;