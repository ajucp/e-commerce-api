const db=require('../config/db');

const createUser=async(username,hashedPassword,email,address)=>{
    const query=`INSERT INTO users (username,password,email,address,created_at,updated_at)
                VALUES(?,?,?,?,NOW(),NOW())`;
    
    const [result]=await db.execute(query,[username,hashedPassword,email,address]);
    console.log(result)
    return result.insertId;
}

const getUserByUsername=async(username)=>{
    const query='SELECT * FROM users WHERE username=?';
    const [user]=await db.execute(query,[username]);
    return user[0]
}

const getUserByEmail =async(email)=>{
    const query='SELECT * FROM users WHERE email=?';
    const [user]=await db.execute(query,[email]);
    return user[0]
}

const getUserById=async(id)=>{
    const query='SELECT * FROM users WHERE id=?';
    const userid=await db.execute(query,[id]);
    return userid[0]
}

const updateUser=async(id,address)=>{
    const query=`UPDATE users SET address=? ,updated_at=NOW() WHERE id=?`;
    const [result]=await db.execute(query,[address,id]);
    return result.affectedRows;
}
module.exports={createUser,getUserByUsername,getUserByEmail,getUserById,updateUser}