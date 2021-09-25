const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kanya123:kanya123@devconnector.sytzh.mongodb.net/to_do?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true},(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('DB connected successfully');
    }
})
