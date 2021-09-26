const to_do= require('../../models/to_do');
const jwt = require('jsonwebtoken');




class TO_DO{

    // crate item

async create(req,res){
        try{
            let { title , body } = req.body;
            let { data } = req;
            if(data.role == "Admin" || data.role == "admin"){
            if(title && body){
                let to_do_create = new to_do({title,body});
                await to_do_create.save();
                return res.json({status:200,to_do_create});
            }
            else return res.json({status:401,Error:"Please provide title and body"})
        }
        else return res.json({status:401,Error:"Unauthorized error"})
        }
        catch(err){
            res.json({status:401,Error:err})
        }
    }


// get all items
   
   
async getAll(req,res){
        try{

            let data = await to_do.find();
            if(data.length>0){
                return res.json({status:200,total_item:data.length,data});
            }
            else return res.json({status:401,Error:"No data found"})

        }
        catch(err){ res.json({status:401,Error:err})}
    }

    //for delete specific item

async delete(req,res){
        try{
            let {id} = req.query;
            console.log(id,' in delete id ')
            let {data} = req;
            if(data.role == "Admin" || data.role == "admin"){
            if(id){
                let delete_data = await to_do.findOneAndRemove({_id:id});
                if(delete_data) return res.json({status:200,Info:"Item deleted successfully"})
                else return res.json({status:401,Error:"Given item not found"});
            }
            else return res.json({status:401,Error:"please provide delete element address"})
            }
            else return res.send({status:401,Error:"Unauthorized error"})
        }

        catch(err){console.log(err);res.json({status:401,Error:err})}
    }

    // get specific item

async getID(req,res){
        try{

            let {id} = req.query;
            console.log(id)
            if(id){
                let getdata = await to_do.findOne({_id:id});
                if(getdata) return res.json({status:200,getdata});
                else return res.json({status:401,Error:"No data found"}) 
            }
            else return res.json({status:401,Error:"Please provide address whatever you want to visit"})
        }
        catch(err){return res.send({status:401,Error:err})}
    }

// update specific item

async update(req,res){
        try{

            let {id} = req.params;
            let { data  } = req;
            if(data.role == "Admin" || data.role == "admin"){
                let info = await to_do.findOneAndUpdate({_id:id},{title:req.body.title,body:req.body.body},{upsert: true});
                if(info){
                     return res.json({status:200,Info:" Item Updated successfully"}) 
                }
                else return res.json({status:401,Error:"Item not found"})  
            }  
            else return res.send({status:401,Error:"Unauthorized error"})
        }
        catch(err) { console.log(err);res.json({status:401,Error:err}) }
    }

// create same item 


async createClone(req,res){
        try{
            let {data} = req;
            let { id } = req.params;
            if(data.role == "Admin" || data.role == "admin"){

                if(id){
                    let to_do_item = await to_do.findOne({_id:id});
                    if(to_do_item){
                        let new_item = new to_do({title:to_do_item.title,body:to_do_item.body});
                        await new_item.save();
                        return res.json({status:200,new_item});
                    }
                    else return res.send({status:401,Error:'No item found'})
                }
                else return res.json({status:401,Error:"Please provide item address"})

            }
            else return res.json({status:401,Error:"Unauthorized error"})
        }
        catch(err){
            res.json({status:401,Error:err})
        }
    }
    async logout(req,res){
        try{
            let {data} = req;
            data.token = " ";
            await data.save();
            res.json({status:"success",Info:"you logout successfully"})
        }
        catch(err){
            res.json({status:"Fail",Error:err})
        }
    }

}

module.exports = new TO_DO();