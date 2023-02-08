const ItemService = require('../services/item.service');

class ItemController {
    itemService = new ItemService();

    getAllItems = async (req, res, next) => {
        const items = await this.itemService.getAllItems();

        return res.status(200).json(items);
    }

    getAnItem = async (req, res, next) => {
        const { itemId } = req.params;
        const item = await this.itemService.getAnItem(itemId);

        return res.status(200).json(item);
    }
}

module.exports = ItemController;