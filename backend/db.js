const mongoose = require('mongoose');
const ConnectToDb= async ()=>{
    try{
        const connect= await mongoose.connect(process.env.MONGO_URL);
        console.log('database connection established',connect.connection.host,connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports=ConnectToDb;