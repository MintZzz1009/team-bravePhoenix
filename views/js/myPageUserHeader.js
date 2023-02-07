
function printUserInfo(){

    $('#modalMypage').modal("show");
    document.getElementById("modalMypageText").innerHTML = "";

    $.ajax({
        type: "GET",
        url: "/api/myPage/user",
        success: function (response){
            console.log(response);

            const userNickname = response.userNickname;
            const userEmail = response.userEmail;
            const userPhoneNumber = response.userPhoneNumber;
            const userCreatedAt = response.userCreatedAt;

            let tempHtml = `
                <div class="input-group mb-3">
                    <span class="input-group-text">유저 이름</span>
                    <input type="text" id="userNickname" class="form-control" placeholder="${userNickname}" aria-label="${userNickname}" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" >유저 이메일</span>
                    <input type="text" id="userEmail" class="form-control" placeholder="${userEmail}" aria-label="${userEmail}" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" >유저 전화번호</span>
                    <input type="text" id="userPhoneNumber" class="form-control" placeholder="${userPhoneNumber}" aria-label="${userPhoneNumber}" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" >변경할 비밀번호</span>
                    <input type="password" id="userPassword" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" >변경할 비밀번호 확인</span>
                    <input type="password" id="userConfirmPassword" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
                </div>

                <div>
                    가입일: ${userCreatedAt} &nbsp; <span id = "errMsgSpan" style = "color: red;"> </span>
                </div
            `;

            $('#modalMypageText').append(tempHtml);               

        }
    })

}

function updateUserInfo(){

    const userNickname = $('#userNickname').val();
    const userPassword = $('#userPassword').val();
    const userConfirmPassword = $('#userConfirmPassword').val();
    const userEmail = $('#userEmail').val();
    const userPhoneNumber = $('#userPhoneNumber').val();

    document.getElementById("errMsgSpan").innerHTML = "";

    $.ajax({
        type: "PATCH",
        url: "/api/myPage/user",
        data:{
            userNickname,
            userPassword,
            userConfirmPassword,
            userEmail,
            userPhoneNumber
        },
        success: function (response){
            if(response.errMsg){
                console.log(response.errMsg);
                $('#errMsgSpan').append(response.errMsg);
            }else{
                console.log(response.msg);
                alert(response.msg);
                $('#modalMypage').modal('hide');

            }
        }
    })
    
}

function destroyUser(){
    if(confirm("정말 탈퇴하시겠습니까?") === true){
        $.ajax({
            type: "DELETE",
            url: "/api/myPage/user",
            success: function (response){
                alert(response.msg);
                $('#modalMypage').modal('hide');
            }
        });
    }else{
        return;
    }
}
