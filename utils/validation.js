const jwt = require('jsonwebtoken');
const user = require('../models/user');

const RouteGuard = async(req,res,next)=>{
try{

    let token = req.get('Auth-Controller');
    if(!token) return res.status(400).json({status: 400, message: "Unauthorized Access"});
    else{
        const info = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!info)
          return res
            .status(400)
            .json({status: 400, message: "Unauthorized Access"});
        else {
         let info=await user.findOne({token});
         if(info!==null){
          req.data = info
          next();
         } 
         else return res.status(400).json({status:400,message:"Unauthorized Access"})
         
        }
    }

}
catch(err){
    console.log(err)
    res.json({Error:"Session expired Please login again"})
}
}

module.exports = RouteGuard;