const express = require("express");
const router = express.Router();

const MyPageController = require("../controllers/myPage.controller");
const MyPageRenderer = require("../renderers/myPageRenderer");

const myPageController = new MyPageController();
const myPageRenderer = new MyPageRenderer();

//////////////////////////////
//유저 관련 api

router.get("/user", myPageController.getUser); //ajax완료
router.delete("/user", myPageController.destroyUser); //ajax완료
router.patch("/user", myPageController.updateUser); //ajax완료

router.get("/user/orders", myPageController.getAllOrdersInProgress); //ajax완료
router.get("/user/order/:orderId", myPageController.getAnOrderInProgress); //ajax완료
router.get("/user/orders/paid", myPageController.getAllPaymentHistories); //ajax완료

///////////////////////
//사장님 관련 api

router.get("/owner/items", myPageController.getAllItems); //ajax완료
router.post("/owner/item", myPageController.createAnItem); //ajax완료 //상품사진 업로드 미구현
router.get("/owner/item/:itemId", myPageController.getAnItem); //ajax완료
router.delete("/owner/item/:itemId", myPageController.destroyAnItem); //ajax완료 //주문된 상품 있을경우 삭제 불가능한 예외처리 추가필요
router.patch("/owner/item/:itemId", myPageController.updateAnItem);

router.get("/owner/order/items", myPageController.getAllItemsOrdered); //ajax완료
router.get("/owner/order/item/:orderId&:itemId", myPageController.getAnItemOrdered); //ajax완료
router.patch("/owner/order/item/:orderId&:itemId", myPageController.changeOrderStatus); //ajax완료

/////////////////////////////
//렌더링 관련

router.get("/", myPageRenderer.getMyPage);
router.get("/user/progress", myPageRenderer.getMyPageUserMainProgress);
router.get("/owner/progress", myPageRenderer.getMyPageOwnerMainProgress);
router.get("/cart", myPageRenderer.getMyPageUserCart);

/////////////////////////////
//장바구니 관련

router.get("/cart/items", myPageController.getAllItemsInCart); //ajax완료
router.patch("/cart/item/:cartId", myPageController.changeQuantityInCart); //ajax완료
router.delete("/cart/item/:cartId", myPageController.destroyAnItemInCart); //ajax완료

module.exports = router;