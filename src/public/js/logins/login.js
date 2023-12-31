
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");
const signInBtn = document.querySelector("#sign-in-btn");

signInBtn.addEventListener("click", login);

function login() {
    console.log("button clicked");
    event.preventDefault();
    if (!email.value) return alert("email must be entered");
    if (!pwd.value) return alert("password must be entered");

    const request = {
        email: email.value,
        pwd: password.value,
    };

    fetch("/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }).then((res) => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.refreshToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                const signedInLink = document.querySelector("#sign-in-link");
                location.href = "/";
            } else {
                alert(res.msg);
            }
        }).catch(err => {
            console.error("Error Login");
        });
}

