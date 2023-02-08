const express = require("express");
const router = express.Router();

const ItemsController = require('../controllers/item_controllers');
const itemsController = new ItemsController();

router.get('/items', itemsController.getItems);

module.exports = router;