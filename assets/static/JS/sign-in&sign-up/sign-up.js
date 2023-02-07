function signup_click() {
    const password = $("#password").val();
    const re_password = $("#re_password").val();
    const nickname = $("#nickname").val();
    const phone = $("#phone").val();
    const email = $("#email").val();

    console.log(password, re_password, nickname, phone, email)
    $.ajax({
        type: "POST",
        url: "/api/sign-up",
        data: {
            userPassword: password,
            confirmPassword: re_password,
            userEmail: email,
            userPhoneNumber: phone,
            userNickname: nickname,
        },
        success: function (response) {
            alert("회원가입을 축하합니다");
            window.location.href = '../../templates/sign-in&sign-up/sign-in.html';
        },
        erroer: function (error) {
            alert("에러입니다")
        }
    })
}