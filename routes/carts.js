const express = require("express")
const {Item , Order , User,Cart} = require("../models")
//cart를 만들어야 될거같다
const router = express.Router();

// router.get("/cart", async (req, res) => {  
//     res.send('장바구니 페이지')
// });
/**
 * 내가 가 진 장바구니 목록을 전부불러온다.
 */
router.get("/cart/item" , async(req,res)=>{
    const cart = await Cart.findAll({
        where:{
            cartId,
        },
    })
    const itemsId = cart.map((c) => itemsId)
})
/**
 * 장바구니에 상품 담기.
 * 장바구니에 상품이 이미 담겨있으면 갯수만 수정한다.
 */
router.put("/cart/item/:itemId", async(req,res)=>{
    const{itemId} = req.params
    const{quantity} = req.body 

    const existsCart = await Cart.findOne({
        where: {
          itemId,
          quantity,
        },
      });
      if (existsCart) {
        existsCart.quantity = quantity;
        await existsCart.save();
      } else {
        await Cart.create({
          itemId,
          quantity,
        });
      }
        // NOTE: 성공했을때 응답 값을 클라이언트가 사용하지 않는다.
      res.send({});
})
/**
 * 장바구니 항목 삭제
 */
router.delete("/car/item/:itemId", async(req,res)=>{
    const {itemId} = req.params

    const existsCart = await Cart.find({itemId});
    if (existsCart.length > 0) {
        await Cart.deleteOne({ itemId });
    }
    res.json({result:"success"})
})






module.exports = router