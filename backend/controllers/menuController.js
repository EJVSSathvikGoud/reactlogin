import { ResultWithContext } from "express-validator/src/chain";
import { MAX_ACCESS_BOUNDARY_RULES_COUNT } from "google-auth-library/build/src/auth/downscopedclient";
import menu from "../models/menu";

const getMenuData = (req,res)=>{
    menu.find({}, (err,menus) =>
    {
        if(err)
        {
            res.send("WRONG");
            next();
        }
        res.json(menus);
})};

const updateMenuData = (req,res)=>{
    menu.updateOne()
};

const postMenuData = (req,res)=>{
    
};

const deleteMenuData = (req,res)=>{
    menu.findByIdAndDelete()
};

module.exports={

}

const createMenuData = (req,res)=>{
    const menu=new menu(req.body);
    menu.save()
        .then()
        .catch(err=>{})

};