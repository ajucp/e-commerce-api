const mysql=require('mysql2');

require('dotenv').config();


const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'ecommerce'
})

module.exports=pool.promise();