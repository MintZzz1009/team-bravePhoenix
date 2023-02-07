const ItemsService = require('../services/item_service');

class ItemsController {
    ItemsService = new ItemsService();

    getItems = async (req, res, next) => {
        const items = await this.ItemsService.findAllItem();

        res.status(200).json({ data: items });
    };
}

module.exports = ItemsController;