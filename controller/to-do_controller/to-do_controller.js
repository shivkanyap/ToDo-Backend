const { sequelize,to_do} = require('../../models/index');
const jwt = require('jsonwebtoken');
const e = require('express');
const { title } = require('process');


class TO_DO{

    // crate item

async create(req,res){
        try{
            let { title , description } = req.body;
            let { data } = req;
            if(data.role == "Admin" || data.role == "admin"){
            if(title && description){
                let to_do_create = await to_do.create({title,description});
                return res.json({status:200,to_do_create});
            }
            else return res.json({status:401,Error:"Please provide title and description"})
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

            let data = await to_do.findAll();
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
            let {id} = req.params;
            let {data} = req;
            if(data.role == "Admin" || data.role == "admin"){
            if(id){
                let delete_data = await to_do.destroy({where:{to_do_id:id}});
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

            let {id} = req.params;
            if(id){
                let getdata = await to_do.findOne({where:{to_do_id:id}});
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
                let info = await to_do.update({title:req.body.title,description:req.body.description},{where:{to_do_id:id},raw:true});
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
                    let to_do_item = await to_do.findOne({where:{to_do_id:id}});
                    if(to_do_item){
                        let new_item = await to_do.create({title:to_do_item.title,description:to_do_item.description});
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

}

module.exports = new TO_DO();