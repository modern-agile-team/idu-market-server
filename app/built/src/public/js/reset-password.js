var id = document.querySelector("#id"), newPsword = document.querySelector("#new-psword"), newPswordConfirm = document.querySelector("#new-psword-confirm"), changePswordBtn = document.querySelector("button");
changePswordBtn.addEventListener("click", changePsword);
function changePsword(e) {
    e.preventDefault();
    if (!id.value)
        return alert("아이디를 입력해주십시오.");
    if (!newPsword.value)
        return alert("비밀번호를 입력해주십시오.");
    if (newPsword.value !== newPswordConfirm.value)
        return alert("비밀번호가 일치하지 않습니다.");
    var req = {
        id: id.value,
        newPsword: newPsword.value,
    };
    fetch("/api/password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then(function (res) { return res.json(); })
        .then(function (res) {
        if (res.success) {
            console.log("비밀번호가 변경되었습니다.");
        }
        else {
            console.log(res);
        }
    })
        .catch(function (err) {
        alert(err);
        console.error(err.response);
    });
}
