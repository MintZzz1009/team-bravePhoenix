const MyPageService = require("../services/myPage.service");
const bcrypt = require("bcrypt");

//전반적으로 오류 발생 시에 오류번호 ex) status(200) 조정이 필요함
class MyPageController{

    myPageService = new MyPageService();

    getUser = async (req, res, next) => {
        // const userId = res.locals.a.userId;

        const userId = 6;

        const user = await this.myPageService.getUser(userId);

        // console.log(user);

        return res.status(200).json(user);
    }

    destroyUser = async (req, res, next) => {
        // const userId = res.locals.a.userId;

        const userId = 6;

        const msg = await this.myPageService.destroyUser(userId);        

        return res.status(200).send(msg);
    }

// 비밀번호 암호화 >> 해결 //  양식검증 필요 
// req.body가 비어있을 경우 예외 처리 필요
    updateUser = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        
        const userId = 6;
        const { userNickname, userPhoneNumber, userEmail, userPassword, userConfirmPassword } = req.body;        

        const msg = await this.myPageService.updateUser(userId, userNickname, userPhoneNumber, userEmail, userPassword, userConfirmPassword);

        return res.status(200).send(msg);
    }

    //기능 추가 필요 >> DB구조 변경 후 로우쿼리로 해결
    getAllOrdersInProgress = async (req, res, next) => {
        // const userId = res.locals.a.userId;

        const userId = 1;

        const orders = await this.myPageService.getAllOrdersInProgress(userId);

        return res.status(200).json(orders);
    }

    //가능하면 repo쪽 메소드 병합 필요 >> DB구조 변경 후 로우쿼리로 해결
    getAnOrderInProgress = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 1;
        const { orderId } = req.params;        

        const order = await this.myPageService.getAnOrderInProgress(userId, orderId);

        return res.status(200).json(order);
    }

    getAllPaymentHistories = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 1;
        
        const histories = await this.myPageService.getAllPaymentHistories(userId);

        return res.status(200).json(histories);
    }

    /////////////////////////////////////////////

    getAllItems = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;

        const items = await this.myPageService.getAllItems(userId);

        return res.status(200).json(items);

    }

    createAnItem = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;
        const { itemName, itemCategory, itemImg, itemDesc, itemPrice } = req.body;        
        
        const msg = await this.myPageService.createAnItem(userId, itemName, itemCategory, itemImg, itemDesc, itemPrice);

        return res.status(200).send(msg);

    }

    getAnItem = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;
        const { itemId } = req.params;

        const item = await this.myPageService.getAnItem(userId, itemId);

        return res.status(200).json(item);

    }

    destroyAnItem = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;
        const { itemId } = req.params;

        const msg = await this.myPageService.destroyAnItem(userId, itemId);

        return res.status(200).send(msg);
    }

    updateAnItem = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;
        const { itemId } = req.params;
        const { itemName, itemCategory, itemImg, itemDesc, itemPrice } = req.body;

        const msg = await this.myPageService.updateAnItem(userId, itemId, itemName, itemCategory, itemImg, itemDesc, itemPrice);

        return res.status(200).send(msg);
    }

    getAllItemsOrdered = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;
        const items = await this.myPageService.getAllItemsOrdered(userId);

        return res.status(200).json(items);
    }

    getAnItemOrdered = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;
        const { orderId, itemId } = req.params;        

        const item = await this.myPageService.getAnItemOrdered(userId, orderId, itemId);

        return res.status(200).json(item);
    
    }

    changeOrderStatus = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 4;
        const { orderId, itemId } = req.params;

        const msg = await this.myPageService.changeOrderStatus(userId, orderId, itemId);

        return res.status(200).send(msg);
    }

    /////////////////////////////////////////////

    getAllItemsInCart = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 6;

        const items = await this.myPageService.getAllItemsInCart(userId);

        return res.status(200).json(items);
    }

    changeQuantityInCart = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 6;
        const { cartId } = req.params;
        const { quantity } = req.body;

        const msg = await this.myPageService.changeQuantityInCart(userId, cartId, quantity);

        return res.status(200).send(msg);
    }

    destroyAnItemInCart = async (req, res, next) => {
        // const userId = res.locals.a.userId;
        const userId = 6;
        const { cartId } = req.params;

        const msg = await this.myPageService.destroyAnItemInCart(userId, cartId);

        return res.status(200).send(msg);
    }
}

module.exports = MyPageController;