const express = require("express");
const router = express.Router();

const ItemController = require('../controllers/item.controller');
const ItemRenderer = require("../renderers/itemRenderer");
const itemController = new ItemController();
const itemRenderer = new ItemRenderer();

router.get("/items", itemController.getAllItems);
router.get("/:itemId", itemController.getAnItem);



///////////////////////////////////
//렌더링 관련
router.get("/", itemRenderer.getItemPage);
router.get("/detail/:itemId", itemRenderer.getItemPageWithAnItem);



module.exports = router;