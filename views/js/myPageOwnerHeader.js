

function printCreateAnItemModal(){
    $('#modalAddItem').modal("show");
    document.getElementById("modalAddItemText").innerHTML = "";

    let tempHtml = `
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="itemName" placeholder="name@example.com">
            <label for="floatingInput">상품 이름</label> &nbsp; <span style="color: red; font-size:13px" id="itemNameErr" class= "errMsgSpan">  </span><span style="visibility: hidden;">꼼수</span>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="itemDesc" placeholder="name@example.com">
            <label for="floatingInput">상품 설명</label> &nbsp; <span style="color: red; font-size:13px" id="itemDescErr" class= "errMsgSpan">  </span><span style="visibility: hidden;">꼼수</span>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="itemPrice" placeholder="name@example.com">
            <label for="floatingInput">상품 가격</label> &nbsp; <span style="color: red; font-size:13px" id="itemPriceErr" class= "errMsgSpan">  </span><span style="visibility: hidden;">꼼수</span>
        </div>

        <select id ="category" style="display: inline;">
            <option value ="-1"> 상품 종류 </option>
            <option value ="0"> 식음료 </option>
            <option value ="1"> 생활용품 </option>
            <option value ="2"> 전자기기 </option>
            <option value ="3"> 의류 </option>
        </select>
        &nbsp; &nbsp;

        <input type="file" style="display: inline;">
        <br>
        <span style="color: red; font-size:13px" id="categoryErr" class= "errMsgSpan">  </span> </span><span style="visibility: hidden;">꼼수</span>

    `;

    $('#modalAddItemText').append(tempHtml);
    
}

function createAnItem(){

    const itemName = $('#itemName').val();
    const itemDesc = $('#itemDesc').val();
    const itemPrice = $('#itemPrice').val();
    const category = $('#category').val();
    // const file =
    document.getElementById("itemNameErr").innerHTML = "";
    document.getElementById("itemDescErr").innerHTML = "";
    document.getElementById("itemPriceErr").innerHTML = "";
    document.getElementById("categoryErr").innerHTML = "";

    if(itemName.length < 1){
        $('#itemNameErr').append("상품 이름을 입력해 주세요");
        return;
    } else if (itemDesc.length < 1){
        $('#itemDescErr').append("상품 설명을 입력해 주세요");
        return;
    } else if (itemPrice.length < 1 ){
        $('#itemPriceErr').append("상품 가격을 입력해 주세요");
        return;
    } else if (Number.isNaN(parseInt(itemPrice))){
        $('#itemPriceErr').append("상품 가격에 숫자만 입력해 주세요");
        return;            
    } else if (category < 0){
        $('#categoryErr').append("상품 종류를 선택해 주세요");
        return;
    }

    $.ajax({
        type: "POST",
        url: "/api/myPage/owner/item",
        data: {
            itemName: itemName,
            itemDesc: itemDesc,
            itemPrice: itemPrice,
            itemCategory: category,                
        },
        success: function(response){
            console.log(response.msg);                
        }

    })

    console.log(itemName);

    $('#modalAddItem').modal('hide');
}
