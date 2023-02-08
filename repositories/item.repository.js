const { item: Item } = require('../models')

class ItemRepository {

    async getAllItems(){
        try{
            const items = await Item.findAll({
                order: [["itemCreatedAt", "desc"]]
            });
    
            return items;
        } catch (err) {
            console.log(err);
        }        
    }

    async getAnItem(itemId){
        try{
            const item = await Item.findOne({
                where:{
                    itemId: itemId
                }
            })

            return item;
            
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ItemRepository;