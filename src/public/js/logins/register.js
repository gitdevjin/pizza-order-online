
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const street = document.querySelector("#street");
const city = document.querySelector("#city");
const province = document.querySelector("#province");
const signUpBtn = document.querySelector("#sign-up-btn");

signUpBtn.addEventListener("click", register);

function register() {
    event.preventDefault();
    if (!email.value) return alert("email must be entered");
    if (!pwd.value) return alert("password must be entered");
    if (!firstName.value) return alert("firstName must be entered");
    if (!lastName.value) return alert("lastName must be entered");
    if (!street.value) return alert("street must be entered");
    if (!city.value) return alert("city must be entered");
    if (province.value === "select") return alert("province must be selected");

    const request = {
        email: email.value,
        pwd: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        street: street.value,
        city: city.value,
        province: province.value,
    };
    console.log(request);

    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }).then((res) => res.json())
        .then(res => {
            if (res.success) {
                alert(res.msg);
                location.href = "/signin";
            } else {
                alert(res.msg);
            }
        }).catch(err => {
            console.error("Error Login");
        });
}

