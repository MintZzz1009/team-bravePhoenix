
$(document).ready(function(){
    document.getElementById("addedList").innerHTML = "";

    $.ajax({
        type: "GET",
        url: "/api/myPage/owner/items",
        success: function (response){
            let rows = response;
            let tempHtml = ``;

            for(let i = 0; i< rows.length; i++){
                tempHtml += `
                    <tr onclick ="printAnItem(${rows[i].itemId})">
                        <td>
                            ${rows[i].itemId} &nbsp;
                        </td>
                        <td>
                            <img src = "${rows[i].itemImg}"> &nbsp;
                        </td>
                        <td>
                            ${rows[i].itemName} &nbsp;
                        </td>
                        <td>
                            ${rows[i].itemDesc} &nbsp;
                        </td>
                        <td>
                            ${rows[i].itemPrice} &nbsp;
                        </td>
                        <td>
                            ${rows[i].itemCreatedAt}
                        </td>
                    </tr>
                `;
            }

            $('#addedList').append(tempHtml);
        }
    });
});

function printAnItem(itemId){
    $("#modal").modal("show");

    $.ajax({
        type: "GET",
        url: "/api/myPage/owner/item/" + itemId,
        success: function(response){
            document.getElementById("modalText").innerHTML = "";
            document.getElementById("modalFooter").innerHTML = "";
            let row = response;
            let tempHtml = `<table>
                        <tr>
                            <td>
                                등록번호 &nbsp;
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
                                상품설명 &nbsp;
                            </td>
                            <td>
                                ${row.itemDesc}
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
                                등록일 &nbsp;
                            </td>
                            <td>
                                ${row.itemUpdatedAt}
                            </td>
                        </tr>
                        </table>
            `;

            let tempHtml2 = `
                <button type="button" class="btn btn-primary" style="background-color: red;" onclick="destroyAnItem(${row.itemId})" data-bs-dismiss="modal">삭제</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>           
            `;

            $('#modalText').append(tempHtml);
            $('#modalFooter').append(tempHtml2);
        }
    });
}

function destroyAnItem(itemId){
    $.ajax({
        type: "delete",
        url: "/api/myPage/owner/item/" + itemId,
        success: function(response){
            alert(response.msg);
        }
    })

    location.reload();
}