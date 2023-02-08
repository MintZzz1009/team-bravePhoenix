const item = require("../models/item");
const MyPageRepository = require("../repositories/myPage.repository");
const bcrypt = require("bcrypt");

class MyPageService{

    myPageRepository = new MyPageRepository();

    async getUser(userId){

        const user = await this.myPageRepository.getUser(userId);

        // console.log(user);

        return {
            userNickname: user.userNickname,
            userPhoneNumber: user.userPhoneNumber,
            userEmail: user.userEmail,            
            userCreatedAt: user.userCreatedAt            
        }
    }

    async destroyUser(userId){
        
        const msg = await this.myPageRepository.destroyUser(userId);

        return msg;

    }

    //유저 이름, 전화번호, 비밀번호 양식 검증 필요
    async updateUser(userId, userNickname, userPhoneNumber, userEmail, userPassword, userConfirmPassword){        

        let check = false;
        let encryptedUserPassword = "";
        // let nicknameCheck = false;
        // let phoneNumberCheck = false;

        if(userPassword.length > 0 || userConfirmPassword.length > 0){

            if(userPassword === userConfirmPassword){
                check = true;
                encryptedUserPassword = bcrypt.hashSync(userPassword, 3);
            }

            if(!check){
                return {errMsg: "비밀번호 확인란 미일치 오류"};
            }
        }

        if(await this.myPageRepository.getUserByNickname(userId, userNickname)){
            return {errMsg: "중복된 닉네임 오류"};
        } else if (await this.myPageRepository.getUserByPhoneNumber(userId, userPhoneNumber)){
            return {errMsg: "중복된 전화번호 오류"};
        } else if (await this.myPageRepository.getUserByEmail(userId, userEmail)){
            return {errMsg: "중복된 이메일 오류"};
        }      

        const msg = await this.myPageRepository.updateUser(userId, userNickname, userPhoneNumber, userEmail, encryptedUserPassword);

        return msg;
    }

    //조인해서 아이템 이름도 가져오는 기능 추가 필요 > 로우쿼리로 했음
    async getAllOrdersInProgress(userId){

        const orders = await this.myPageRepository.getAllOrdersInProgress(userId);

        const editedOrders = orders.map((order) => {

            const result = { 
                orderId: order.orderId,
                orderStatus: order.orderStatus,
                orderName: order.orderName,
                orderCreatedAt: order.orderCreatedAt
            };      

            return result;
        });

        return editedOrders;
    }

    //수량도 여러상품 구매일 경우 아이템 아이디에 맞게 정리해야함 >> 테이블 추가로 해결
    async getAnOrderInProgress(userId, orderId){

        const orderArray = await this.myPageRepository.getAnOrderInProgress(userId, orderId);
        // const itemList = order.itemIds.split("|");

        // const items = await this.myPageRepository.getAllItemsWithArray(itemList);        

        return {
           
            orderId: orderArray[0].orderId,
            buyer: orderArray[0].buyer,
            totalPrice: orderArray[0].totalPrice,
            orderCreatedAt: orderArray[0].orderCreatedAt,
            orderRequests: orderArray[0].orderRequests,
            orderRecipientName: orderArray[0].orderRecipientName,
            orderAddress: orderArray[0].orderAddress,
            orderPhoneNumber: orderArray[0].orderPhoneNumber,

            orderItems: orderArray.map((order) => {
                return{
                    itemId: order.itemId,
                    itemName: order.itemName,
                    itemimg: order.itemImg,
                    itemPrice: order.itemPrice,
                    itemQuantity: order.quantity,
                    itemStatus: order.orderStatus,
                    itemMarketer: order.marketer
                }
            })     
        }
    }


    
    async getAllPaymentHistories(userId){

        const paymentHistories = await this.myPageRepository.getAllPaymentHistories(userId);

        return paymentHistories.map((history) => {
             
            return {
                orderId: history.orderId,
                orderName: history.orderName,
                totalPrice: history.totalPrice,                
                orderCreatedAt: history.orderCreatedAt                
            };
            
        });

    }

    ////////////////////////////////////

    async getAllItems(userId){

        const items = await this.myPageRepository.getAllItems(userId);

        return items;

    }

    async createAnItem(userId, itemName, itemCategory, itemImg, itemDesc, itemPrice){
        const msg = await this.myPageRepository.createAnItem(userId, itemName, itemCategory, itemImg, itemDesc, itemPrice);

        return msg;
    }

    async getAnItem(userId, itemId){
        const item = await this.myPageRepository.getAnItem(userId, itemId);

        return item;
    }

    async destroyAnItem(userId, itemId){
        const msg = await this.myPageRepository.destroyAnItem(userId, itemId);

        return msg;
    }

    async updateAnItem(userId, itemId, itemName, itemCategory, itemImg, itemDesc, itemPrice){
        const msg = await this.myPageRepository.updateAnItem(userId, itemId, itemName, itemCategory, itemImg, itemDesc, itemPrice);

        return msg;
    }

    async getAllItemsOrdered(userId){
        const items = await this.myPageRepository.getAllItemsOrdered(userId);

        return items;
    }

    async getAnItemOrdered(userId, orderId, itemId){
        const item = await this.myPageRepository.getAnItemOrdered(userId, orderId, itemId);


        return {
            // item: item
            orderId: item[0].orderId,
            itemId: item[0].itemId,
            itemImg: item[0].itemImg,
            itemName: item[0].itemName,
            itemDesc: item[0].itemDesc,
            itemPrice: item[0].itemPrice,
            quantity: item[0].quantity,
            userNickname: item[0].userNickname,
            userPhoneNumber: item[0].userPhoneNumber,
            orderAddress: item[0].orderAddress,
            orderPhoneNumber: item[0].orderPhoneNumber,
            orderRequests: item[0].orderRequests,
            orderDetailCreatedAt: item[0].orderDetailCreatedAt
        };

    }

    async changeOrderStatus(userId, orderId, itemId){
        const msg = await this.myPageRepository.changeOrderStatus(userId, orderId, itemId);

        return msg;
    }

/////////////////////////////////////////////////

    async getAllItemsInCart(userId){
        const items = await this.myPageRepository.getAllItemsInCart(userId);

        return items;
    }

    async changeQuantityInCart(userId, cartId, quantity){
        const msg = await this.myPageRepository.changeQuantityInCart(userId, cartId, quantity);

        return msg;
    }

    async destroyAnItemInCart(userId, cartId){
        const msg = await this.myPageRepository.destroyAnItemInCart(userId, cartId);

        return msg;
    }

    async createAnItemInCart(userId, itemId, quantity){
        const msg = await this.myPageRepository.createAnItemInCart(userId, itemId, quantity);

        return msg;
    }

    async createAnOrder(userId, orderRecipientName, orderAddress, orderPhoneNumber, orderRequests){

        try{
            let totalPrice = 0;
            let tempPrice = 0;
            let itemDetail = {};
            let marketer = -1;
            let orderName = "";

            const cartItems = await this.myPageRepository.getAllCartItems(userId);
            console.log(cartItems);

            const orderMsg = await this.myPageRepository.createAnOrder(userId, orderRecipientName, orderAddress, orderPhoneNumber, orderRequests, totalPrice); // 아직 토탈프라이스 없음
            const orderId = await this.myPageRepository.getARecentOrderId(userId);

            for(let i=0; i < cartItems.length; i++){
                marketer = await this.myPageRepository.getAMarketer(cartItems[i].itemId);
                await this.myPageRepository.createOrderDetails(orderId, userId, marketer, cartItems[i].itemId, cartItems[i].quantity);

                itemDetail = await this.myPageRepository.getAnItemDetail(cartItems[i].itemId);
                tempPrice = itemDetail.itemPrice;

                totalPrice += (tempPrice * cartItems[i].quantity);

                await this.myPageRepository.destroyAnItemInCart(userId, cartItems[i].cartId);
            }        

            if(cartItems.length > 1){
                orderName = itemDetail.itemName + "외 " + (cartItems.length -1) +"건";
            }else{
                orderName = itemDetail.itemName + " 주문건";
            }

            await this.myPageRepository.updateOrderTotalPriceAndOrderName(orderId, totalPrice, orderName);

            return {msg: "주문 성공", orderMsg};
        } catch (err) {
        console.log(err);
        }
    }
}


module.exports = MyPageService;