const jwt = require('jsonwebtoken');
const user = require('../../models/user');
const bcrypt = require('bcrypt');
class Login{

    async login(req,res){
        try{

            let { email, password } = req.body;
            if(email && password){

                let user_info = await user.findOne({email});
                if(!user_info) return res.status(401).json({status:"fail",Error:"Email not found"});
                else{

                    let compare = await bcrypt.compare(password,user_info.password);
                    if(compare){
                        let token = await jwt.sign({firstName:user_info.firstname,lastName:user_info.lastname,email,role:user_info.role,status:user_info.status},process.env.JWT_SECRET_KEY,{expiresIn:'60d'});
                        if(token){
                            user_info.token = token;
                            await user_info.save();
                            res.status(200).send({status:"success",Info:"Login successfully"});
                        }
                        else return res.status(401).send({Error:"Token not created successfully"})
                    }
                    else return res.status(401).json({Error:"Password Incorrect"})

                }
            }
            else return res.status(401).send({Error:"Please provide credentials"})
        }
        catch(err){
            console.log(err)
            res.status(401).send({Error:err})
        }
    }


    async login_token(req,res){
        try{     
            let { data } = req;
            res.json({status:"success",data});
        }
        catch(err){
            console.log(err)
            res.status(401).send({status:"fail",Error:err})
        }
    }
}

module.exports = new Login();