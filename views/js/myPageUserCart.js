

$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: "/api/myPage/cart/items",
        success: function (response) {
            console.log(response);

            document.getElementById("cartList").innerHTML = "";                
            let rows = response;
            let tempHtml = ``;

            for(let i = 0; i < rows.length; i++){
                tempHtml += `
                    <tr>
                        <td>
                            <img src="${rows[i].itemImg}">
                        </td>
                        <td>
                            ${rows[i].itemName}
                        </td>
                        <td>
                            ${rows[i].itemPrice}
                        </td>
                        <td class="quantityTd" id="quantity${rows[i].cartId}" >
                            ${rows[i].quantity}
                        </td>
                        <td id="quantityChangeButton${rows[i].cartId}">
                            <button class="statusButton" onclick = "showQuantityInput(${rows[i].cartId}, ${rows[i].quantity})"> 수량 변경</button>
                        </td>
                        <td>
                            <button class="statusButton" onclick = "destroyAnItemInCart(${rows[i].cartId})" style="background-color: red;"> 삭제 </button>
                        </td>
                    </tr>
                `;
            }

            $('#cartList').append(tempHtml);
        }
    });
});

function showQuantityInput(cartId, quantity){
    document.getElementById(`quantity${cartId}`).innerHTML= `
        <input type="text" id ="quantityInput${cartId}" style="width: 60px; height: 30px;" value="${quantity}"> 
    `;

    document.getElementById(`quantityChangeButton${cartId}`).innerHTML = `
        <button class="statusButton" onclick = "changeQuantityInCart(${cartId})"> 변경 확인 </button>
    `;
}

function confirmQuantityButtonAndReturnQuantity(cartId){

    const quantity = $(`#quantityInput${cartId}`).val();

    console.log(quantity);

    document.getElementById(`quantity${cartId}`).innerHTML= `
        ${quantity}
    `;
    document.getElementById(`quantityChangeButton${cartId}`).innerHTML = `
        <button class="statusButton" onclick = "showQuantityInput(${cartId}, ${quantity})"> 수량 변경</button>
    `;

    return quantity;
}

function changeQuantityInCart(cartId){

    const quantity = confirmQuantityButtonAndReturnQuantity(cartId);

    $.ajax({
        type: "PATCH",
        url: "/api/myPage/cart/item/" + cartId,
        data:{
            quantity: quantity
        },
        success: function (response){
            console.log(response.msg);
        }

    })
}

function destroyAnItemInCart(cartId){

    $.ajax({
        type: "DELETE",
        url: "/api/myPage/cart/item/" + cartId,
        success: function (response){
            console.log(response.msg);
            alert(response.msg);

            location.reload();
        }
    })

}
