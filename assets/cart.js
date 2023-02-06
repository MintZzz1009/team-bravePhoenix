//장바구니 담기
function addToCart(itemId, quantity, callback) {
    $.ajax({
      type: "PUT",
      url: `/api/cart/item/${itemId}`,
      data: {
        quantity,
      },
      error: function (xhr, status, error) {
        if (status == 400) {
          alert("존재하지 않는 상품입니다.");
        }
        window.location.href = "/item.html";
      },
      success: function () {
        callback();
      },
    });
  }
  
//   function buyLocation(params) {
//     sessionStorage.setItem("ordered", JSON.stringify(params));
//     location.href = "order.html";
//   }
  // 목록 가져오기
  function getCarts(callback) {
    $.ajax({
      type: "GET",
      url: `/api/cart/item`,
      success: function (response) {
        callback(response.cart);
      },
    });
  }
  // 삭제
  function deleteCart(itemId, callback) {
    $.ajax({
      type: "DELETE",
      url: `/api/item/${itemId}`,
      success: function () {
        callback();
      },
    });
  }
  