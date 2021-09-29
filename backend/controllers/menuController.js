const menu = require("../models/menu");

exports.newMenu = (req , res) =>{
    const Menu = new menu ({
        fooditem : req.body.fooditem,
        timing : req.body.timing,
        day : req.body.day
    })
    Menu.save().then((new_user,err)=>{
        if(err){
           return res.status(500).json({error:"Server Error"})
        }
        
        res.status(200).json({message:"Menu save successfully"})
    })
    .catch(err=>{
        res.status(400).json({message:"save Error, Please Try Again",err})
    })
}

exports.fetchMenu = (req, res) => {
    menu.find()
    .then(fetchedMenu=>res.json(fetchedMenu))
    .catch(err => console.log(err))
}

exports.updateMenu = (req, res)=>{
    menu.findById(req.params.id,(err,foundItem)=>{
        // console.log(req.categary.id)
        if(err)
            return res.json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.json({message:"Item Doesn't exist, please check."});
            updatedItem = {
                fooditem : req.body.fooditem,
                timing : req.body.timing,
                day : req.body.day
            }
            // console.log(req.body)
            menu.findByIdAndUpdate(req.params.id , updatedItem , {
                new : true, 
                useFindAndModify : false 
            }).then((new_user,err)=>{
                // console.log(new_user)
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Updated"})
            })
            .catch(err=>{
                res.status(400).json({message:"Updation Error, Please Try Again",err})
            })
    })
}

exports.deleteMenu = (req ,res) =>{
    // console.log(req.params.id);
    menu.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.json({message:"Categary Doesn't exist, please register."});
            menu.findByIdAndDelete(req.params.id 
                // new : true, 
                // useFindAndModify : false 
            ).then((new_user,err)=>{
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Deleted"})
            })
            .catch(err=>{
                res.status(400).json({message:"Updation Error, Please Try Again",err})
            })
    })
}