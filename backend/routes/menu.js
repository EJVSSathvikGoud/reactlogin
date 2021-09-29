const express = require("express");
const router = express.Router();

const menu_control = require("../controllers/menuController");


router.get("/menu" , menu_control.fetchMenu);

router.post("/menu" , menu_control.newMenu);

router.put('/menu/:id' , menu_control.updateMenu)

router.delete('/menu/:id' , menu_control.deleteMenu)

module.exports = router;