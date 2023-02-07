const { user: User, order: Order, orderDetail: OrderDetail, item: Item, cart: Cart, sequelize } = require("../models");
const { Op, QueryTypes } = require("sequelize");

class MyPageRepository{    
    
    async getUser(userId){

        try{
            const user = await User.findOne({
                where:{
                    userId: userId
                }
            });

            return user;

        }catch (err) {
            console.log(err);
        }
    }

    //DB에 where에 해당하는 조건이 없어도 삭제성공으로 가기 때문에 해결 필요. findOne을 먼저 해야할듯
    async destroyUser(userId){

        try{
            await User.destroy({
                where:{
                    userId: userId
                }
            })

            return {msg: "삭제 성공"};

        }catch (err) {

            console.log(err);

            return {msg: "오류 발생"};

        }         
    }

    async updateUser(userId, userNickname, userPhoneNumber, userEmail, userPassword){

        try{
            // await User.update({
            //     userNickname: userNickname,
            //     userPhoneNumber: userPhoneNumber,
            //     userPassword: userPassword,
            //     userEmail: userEmail
            // },{
            //     where:{
            //         userId: userId
            //     }
            // });

            if(userNickname.length > 0){
                await User.update({userNickname}, {where:{userId}});
            }
            if(userPhoneNumber.length > 0){
                await User.update({userPhoneNumber}, {where:{userId}});
            }
            if(userEmail.length > 0){
                await User.update({userEmail}, {where:{userId}});
            }
            if(userPassword.length > 0){
                await User.update({userPassword}, {where:{userId}});
            }            

            return {msg: "변경 성공"};

        } catch (err) {
            console.log(err);
        }        
    }
    
    async getUserByNickname(userId, userNickname){

        try{
            const user = await User.findOne({
                where: {
                    userNickname: userNickname,
                    userId: {
                        [Op.notIn]: [userId]
                    }
                    
                }                
            })

            return user;

        } catch (err) {
            console.log(err);
        }    

    }

    async getUserByPhoneNumber(userId, userPhoneNumber){

        try{
            const user = await User.findOne({
                where: {
                    userPhoneNumber: userPhoneNumber,
                    userId: {
                        [Op.notIn]: [userId]
                    }
                }                
            })

            return user;

        } catch (err) {
            console.log(err);
        }  
    }

    async getUserByEmail(userId, userEmail){

        try{
            const user = await User.findOne({
                where: {
                    userEmail: userEmail,
                    userId: {
                        [Op.notIn]: [userId]
                    }
                }                
            })

            return user;

        } catch (err) {
            console.log(err);
        }  
    }

    
    async getAllOrdersInProgress(userId){

        try{
            
            // const orders = await Order.findAll({
            //     where:{
            //         userId: userId,
            //         orderStatus: {[Op.lt]: 3}
            //     },
            //     order:
            //         [["orderCreatedAt","desc"]]
                
            // });

            const query =   `
                select * from ` + '`order`' + ` o
                inner join orderDetail od on o.orderId = od.orderId
                where o.userId = ? and od.orderStatus < 3
                group by o.orderId
                order by o.orderId desc
            `;

            const orders = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: [userId]
            });
            
            return orders;

        } catch (err) {

            console.log(err);
        }
    }

    //쿼리에 split쓰고 함수 합쳐서 하나로 할 수 있으면 변경 요망 > 일단 로우쿼리로 해결..
    async getAnOrderInProgress(userId, orderId){
        try{

            // const orderArray = await Order.findAll({
            //     where: {
            //         userId: userId,
            //         orderNumber: orderNumber,
            //         orderStatus: {[Op.lt]: 3}
            //     }
            // });

            const query = `
                select * from orderDetail od
                inner join item i on od.itemId = i.itemId
                inner join ` + '`order`' +` o on od.orderId = o.orderId  
                where od.buyer = ? and od.orderId = ?;
            `;

            const orderArray = sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: [userId, orderId]
            });

            return orderArray;

        } catch (err) {
            console.log(err);
        }
    }

    // async getAllItemsWithArray(itemList){
    //     try{

    //         const items = await Item.findAll({
    //             where: {
    //                 itemId: {[Op.in]: itemList}
    //             }
    //         });

    //         return items;

    //     } catch (err){

    //     }
    // }

    async getAllPaymentHistories(userId){
        try{
            const paymentHistories = await Order.findAll({
                where:{
                    userId: userId
                },
                order:[["orderCreatedAt", "desc"]]
            }); 

            return paymentHistories

        } catch (err) {
            console.log(err);
        }        

    }

    ////////////////////////////////

    async getAllItems(userId){
        try{
            const items = await Item.findAll({
                where:{
                    marketer: userId
                },
                order:[["itemCreatedAt", "desc"]]
            })

            return items;

        } catch (err) {
            console.log(err);
        }
    }

    async createAnItem(userId, itemName, itemCategory, itemImg, itemDesc, itemPrice){
        try{
            await Item.create({
                marketer: userId,
                itemName: itemName,
                itemCategory: itemCategory,
                itemImg: itemImg,
                itemDesc: itemDesc,
                itemPrice: itemPrice
            })

            return {msg: "등록 성공"};

        } catch (err) {
            console.log(err);
        }
    }

    async getAnItem(userId, itemId){
        try{
            const item = await Item.findOne({
                where:{
                    marketer: userId,
                    itemId: itemId
                }
            });

            return item;

        } catch (err) {
            console.log(err);
        }
    }

    async destroyAnItem(userId, itemId){
        try{
            await Item.destroy({
                where:{
                    marketer: userId,
                    itemId: itemId
                }
            });

            return {msg: "삭제 성공"};
        } catch (err) {
            console.log(err);
        }
    }

    async updateAnItem(userId, itemId, itemName, itemCategory, itemImg, itemDesc, itemPrice){
        try{
            await Item.update({
                itemName: itemName,
                itemCategory: itemCategory,
                itemImg: itemImg,
                itemDesc: itemDesc,
                itemPrice: itemPrice
            }
            ,{
                where:{
                    marketer: userId,
                    itemId: itemId
                }
            });

            return {msg: "변경 성공"};
        } catch (err) {
            console.log(err);
        }
    }

    async getAllItemsOrdered(userId){
        try{
            // const items = await OrderDetail.findAll({
            //     where: {
            //         marketer : userId,
            //         orderStatus: {
            //             [Op.lt]: 3
            //         }                    
            //     }
            // })

            const query = `
                select * from orderDetail od
                inner join item i on od.itemId = i.itemId
                inner join ` + '`order` ' + `o on o.orderId = od.orderId
                where od.marketer = ? and od.orderStatus < 3;
            `;

            const items = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: [userId]
            });

            return items;

        } catch (err) {
            console.log(err);
        }
        
    }

    async getAnItemOrdered(userId, orderId, itemId){
        try{

            const query = `
                select * from orderDetail od
                inner join item i on od.itemId = i.itemId
                inner join user u on od.buyer = u.userId
                inner join ` + '`order` ' + `o on od.orderId = o.orderId
                where od.marketer = ? and od.orderId = ? and od.itemId = ?;
            `;

            const item = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: [userId, orderId, itemId]
            });

            return item;

        } catch (err) {
            console.log(err);
        }
    }

    async changeOrderStatus(userId, orderId, itemId){
        try{
            await OrderDetail.increment(
                {orderStatus: 1},
                {
                    where: {
                        marketer: userId,
                        orderId: orderId,
                        itemId: itemId,
                        orderStatus: {
                            [Op.lt]: 3
                        }
                    }
                });

            return {msg: "변경 성공"};

        } catch (err) {
            console.log(err);
        }
    }

    //////////////////////////////////////////////////

    async getAllItemsInCart(userId){
        try{
            const query = `
                select * from cart c
                inner join item i on c.itemId = i.itemId
                where c.userId = ?
                order by cartCreatedAt desc
            `;

            const items = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: [userId]
            })

            return items;

        } catch (err) {
            console.log(err);
        }
    }

    async changeQuantityInCart(userId, cartId, quantity){
        
        try{
            await Cart.update({

                quantity: quantity

            },{
                where:{
                    userId: userId,
                    cartId: cartId
                }
            })

            return {msg: "변경 성공"};

        } catch (err) {
            console.log(err);
        }
    }

    async destroyAnItemInCart(userId, cartId){
        try{
            await Cart.destroy({
                where: {
                    userId: userId,
                    cartId: cartId
                }
            })

            return {msg: "삭제 성공"};

        } catch (err) {
            console.log(err);
        }
    }





}



module.exports = MyPageRepository;