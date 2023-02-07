const { item } = require('../models')

class ItemsRepository {
    findAllitems = async () => {
        const items = await item.findAll({
            item: [['itemCreatedAt', 'itemDesc']],
        });
        return items
    }
    finditemById = async (userId) => {
        const items = await item.findByPk(userId);

        return items;
    }
}

module.exports = ItemsRepository;