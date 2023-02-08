const ItemRepository = require('../repositories/item.repository');

class ItemService {
    itemRepository = new ItemRepository();

    async getAllItems(){
        const items = await this.itemRepository.getAllItems();

        return items;
    }
    
    async getAnItem(itemId){
        const item = await this.itemRepository.getAnItem(itemId);

        return item;
    }
    
}

module.exports = ItemService;