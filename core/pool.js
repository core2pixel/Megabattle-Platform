const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */

let dev_mode = false;
let db_password;
let db_settings;
if(!dev_mode){
    db_password = 'arwenPlatform_00';
}else{
    db_password = '';
}
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // use your mysql username.
    password: db_password, // user your mysql password.
    //password: '',
    database: 'megabattle_platform',
    charset: 'utf8mb4'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;