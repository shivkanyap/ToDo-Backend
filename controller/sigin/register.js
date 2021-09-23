const jwt = require('jsonwebtoken');
const { user , sequelize} = require('../../models/index');
const bcrypt = require('bcrypt');

class Register{

    async register(req,res){
        try{
            let { firstname,lastname,email,password,role } = req.body;
            if(email && password){
                let data = await user.findOne({where:{email},raw:true});
                console.log(data)
                if(!data){
                let status="Active";
                //hashing a password with coat factor 10
                let hashedPassword = await bcrypt.hash(password,10);
                let token = await jwt.sign({FirstName:firstname,LastName:lastname,Email:email,isActive:status,Role:role},process.env.JWT_SECRET_KEY,{expiresIn:'60d'});
                if(token){
         
                    let data = await user.create({firstName:firstname,email,lastName:lastname,password:hashedPassword,token,role,status});
                    res.json({status:"success",data});
                }
                else return res.status(401).send({Error:"Token not created successfully"})
                }
            else return res.status(401).send({Error:"User already register"})
            }
            else return res.status(401).send({Error:"Please check your credentials"})

        }
        catch(err){
            console.log(err)
            res.status(401).send({Error:err})
        }
    }

}

module.exports = new Register();