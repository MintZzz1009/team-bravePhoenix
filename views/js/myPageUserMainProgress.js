

$(document).ready(function(){

    document.getElementById("progressList").innerHTML = "";
    

    $.ajax({
        type: "GET",
        url: "/api/myPage/user/orders",
        async: false,
        data:{},
        success: function (response) {
            console.log(response);
            let rows = response;                
            let tempHtml = ``;

            for(let i = 0; i < rows.length; i++){
                tempHtml += `<tr onclick = "printAnOrder(${rows[i].orderId})">
                                <td id="orderId">
                                    ${rows[i].orderId}
                                </td>
                                <td>
                                    ${rows[i].orderName}
                                </td>
                                <td>
                                    진행 중
                                </td>
                                <td>
                                    ${rows[i].orderCreatedAt}
                                </td>
                            </tr>`;
            }

            $("#progressList").append(tempHtml);
        }
    });
});

function printAnOrder(orderId){
    const statusList = ["상품 확인중", "상품 준비중", "배송중", "배송완료"];
        // e.preventDefault();
    $('#testModal').modal("show");
    
    $('#modalText').append("되나??");

    $.ajax({
        type: "GET",
        url: "/api/myPage/user/order/" + orderId,
        success: function (response){
            document.getElementById("modalText").innerHTML = "";
            let row = response;
            let tempHtml = `<table>
                            <tr>
                                <td>
                                    주문번호
                                </td>
                                <td>
                                    ${row.orderId}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    주문일자
                                </td>
                                <td>
                                    ${row.orderCreatedAt}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    수령인 주소
                                </td>
                                <td>
                                    ${row.orderAddress}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    수령인 전화번호
                                </td>
                                <td>
                                    ${row.orderPhoneNumber}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    수령인 성함
                                </td>
                                <td>
                                    ${row.orderRecipientName}
                                </td>                                        
                            </tr>
                            <tr>
                                <td>
                                    주문 요구사항
                                </td>
                                <td>
                                    ${row.orderRequests}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    결제금액
                                </td>
                                <td>
                                    ${row.totalPrice}
                                </td>
                            </tr>
                            </table>
            `;

            tempHtml += `
                <br>
                <table>
                    <th>
                        상품사진 &nbsp;
                    </th>
                    <th>
                        상품이름 &nbsp;
                    </th>
                    <th>
                        상품가격 &nbsp;
                    </th>
                    <th>
                        구매수량 &nbsp;
                    </th>
                    <th>
                        배송상태 
                    </th>                           

            `;

            for(let i = 0; i< row.orderItems.length; i++){
                tempHtml += `
                    <tr>
                        <td>
                            <img src="${row.orderItems[i].itemImg}"
                        </td>
                        <td>
                            ${row.orderItems[i].itemName}
                        </td>
                        <td>
                            ${row.orderItems[i].itemPrice}
                        </td>
                        <td>
                            ${row.orderItems[i].itemQuantity}
                        </td>
                        <td>
                            ${statusList[row.orderItems[i].itemStatus]}
                        </td>
                    </tr>
                `;
            }

            tempHtml += `                        </table>`;
            console.log(row);

            $('#modalText').append(tempHtml);
            
            
        }
    })
}