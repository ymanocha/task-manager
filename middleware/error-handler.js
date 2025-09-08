const {CustomAPIError} = require('../errors/custom-error')

const errorHandlerMiddleware  =  (err,req,res,next)=>{
     //wanna test these again
    // console.log(err)
    // return res.status(err.status).json({msg : err.message})
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).JSON({msg: err.message})
    }
    return res.status(500).json({msg: 'something went wrong, please try again'})
}

module.exports = errorHandlerMiddleware 