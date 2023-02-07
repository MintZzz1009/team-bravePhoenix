if (localStorage.getItem("token")) {
    getSelf(function () {
        alert("이미 로그인이 되어있습니다.");
        window.location.replace("/");
    });
}

function login_click() {
    let useremail = $('#inputUser').val()
    let password = $('#inputPassword').val()
    console.log(useremail);
    const data = {
        "userEmail": useremail,
        "userPassword": password,
    }
    let sendData = JSON.stringify(data);
    console.log(sendData);

    $.ajax({
        type: "POST",
        url: "/api/auth",
        // data: JSON.stringify(data),
        data: {
            userEmail: useremail,
            userPassword: password,
        },
        success: function (response) {
            alert("로그인 성공")
            localStorage.setItem("token", response.token);
            window.location.replace("../main.html");
        },
        error: function (error) {
            console.log(error)
            alert("로그인 실패")
        }
    })
}
