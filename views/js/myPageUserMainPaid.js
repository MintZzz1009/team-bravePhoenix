$(document).ready(function(){

    document.getElementById("paidList").innerHTML = "";

    $.ajax({
        type: "GET",
        url: "/api/myPage/user/orders/paid",
        async: false,
        data:{},
        success: function (response) {
            
            let rows = response;                
            let tempHtml = ``;

            for(let i = 0; i < rows.length; i++){
                tempHtml += `<tr>
                                <td id="orderId">
                                    ${rows[i].orderId} &nbsp;
                                </td>
                                <td>
                                    ${rows[i].orderName} &nbsp;
                                </td>
                                <td>
                                    ${rows[i].totalPrice} &nbsp;
                                </td> 
                                <td>
                                    ${rows[i].orderCreatedAt}
                                </td>
                            </tr>`;
            }

            $("#paidList").append(tempHtml);
        }
    });
});
