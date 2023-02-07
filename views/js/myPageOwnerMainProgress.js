
$(document).ready(function(){

    document.getElementById("orderedList").innerHTML = "";
    const statusList = ["상품 확인중", "상품 준비중", "배송중", "배송완료"];

    $.ajax({
        type: "GET",
        url: "/api/myPage/owner/order/items",
        success: function(response){
            let rows = response;
            console.log(rows);
            let tempHtml = ``;

            for(let i = 0; i< rows.length; i++){
                tempHtml += `
                    <tr onclick="printAnOrderOwner(${rows[i].orderId}, ${rows[i].itemId})">
                        <td>
                            ${rows[i].orderId} &nbsp;
                        </td>
                        <td>
                            ${rows[i].itemId} &nbsp;
                        </td>
                        <td>
                            ${rows[i].itemName} &nbsp;
                        </td>
                        <td>
                            ${rows[i].quantity} &nbsp;
                        </td>
                        <td>
                            ${rows[i].orderAddress} &nbsp;
                        </td>
                        <td>
                            ${rows[i].orderRequests} &nbsp;
                        </td>
                        <td>
                            <button onclick="changeOrderStatus(${rows[i].orderId}, ${rows[i].itemId})" class="statusButton"> ${statusList[rows[i].orderStatus]} </button> &nbsp;
                        </td>
                        <td>
                            ${rows[i].orderDetailCreatedAt}
                        </td>
                    </tr>
                `;
            }
            
            $('#orderedList').append(tempHtml);                
        }
    })
});

function changeOrderStatus(orderId, itemId){

    $.ajax({
        type: "PATCH",
        url: "/api/myPage/owner/order/item/" + orderId + "&" + itemId,
        success: function(response){
            console.log(response.msg);
        }
    })

    location.reload();
}

function printAnOrderOwner(orderId, itemId){

    $('#modal').modal("show");
    document.getElementById("modalText").innerHTML = "";

    $.ajax({
        type: "GET",
        url: "/api/myPage/owner/order/item/" + orderId + "&" + itemId,
        success: function(response){
            let row = response;
            console.log(response);
            let tempHtml = `
                <table>
                    <tr>
                        <td>
                            주문번호 &nbsp;
                        </td>
                        <td>
                            ${row.orderId}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            상품등록번호 &nbsp;
                        </td>
                        <td>
                            ${row.itemId}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            상품사진 &nbsp;
                        </td>
                        <td>
                            <img src="${row.itemImg}">
                        </td>
                    </tr>
                    <tr>
                        <td> 
                            상품이름 &nbsp;
                        </td>
                        <td>
                            ${row.itemName}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            상품가격 &nbsp;
                        </td>
                        <td>
                            ${row.itemPrice}
                        </td>                                        
                    </tr>
                    <tr>
                        <td>
                            상품수량 &nbsp;
                        </td>
                        <td>
                            ${row.quantity}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            구매자 &nbsp;
                        </td>
                        <td>
                            ${row.userNickname}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            구매자 전화번호 &nbsp;
                        </td>
                        <td>
                            ${row.userPhoneNumber}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            배송지 &nbsp;
                        </td>
                        <td>
                            ${row.orderAddress}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            수령인 전화번호 &nbsp;
                        </td>
                        <td>
                            ${row.orderPhoneNumber}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            요청사항 &nbsp;
                        </td>
                        <td>
                            ${row.orderRequests}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            주문일 &nbsp;
                        </td>
                        <td>
                            ${row.orderDetailCreatedAt}
                        </td>
                    </tr>
                </table>
            `;

            $('#modalText').append(tempHtml);
        }            
    })
}