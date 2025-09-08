const mongoose = require('mongoose')



const connectDB = (url) => {
 return mongoose.connect(url)
}

module.exports = connectDB
    //if we use this we get server first then db connected
    //gotta refactor code to solve that issue
    //mongoose.connect(connectionString)
    // .then(()=>{console.log('Connected to the DB...')}) 
    // .catch((err)=>console.log(err))                    