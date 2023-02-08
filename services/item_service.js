const ItemsRepository = require('../repositories/item_repositories');

class ItemsService {
    ItemsRepository = new ItemsRepository();

    findAllitem = async () => {
        const getitems = await this.ItemsRepository.findAllitems();

        getitems.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return getitems.map((item) => {
            return {
                itemId: item.itemId,
                itemName: item.itemName,
                itemImg: item.itemImg,
                itemPrice: item.itemPrice,
                itemCreatedAt: item.itemCreatedAt,
            };
        });
    };
    finditemById = async (userId) => {
        const finditem = await this.ItemsRepository.finditemById(userid);
        return {
            itemId: finditem.itemId,
            itemName: finditem.itemName,
            itemCategory: finditem.itemCategory,
            itemImg: finditem.itemImg,
            itemDesc: finditem.itemDesc,
            itemPrice: finditem.itemPrice,
            marketer: finditem.marketer,
            itemCreatedAt: finditem.itemCreatedAt,
        };
    }
}

module.exports = ItemsService