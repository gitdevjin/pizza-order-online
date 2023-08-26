document.addEventListener("DOMContentLoaded", () => {
    initApp();
})

const initApp = () => {
    const navBox = document.querySelector(".nav");
    const overLay = document.querySelector(".overlay");
    const navBoxBtn = document.querySelector(".nav-box-close");
    overLay.addEventListener("click", toggleOverlay);
    navBox.addEventListener("click", toggleNavBox);
    navBoxBtn.addEventListener("click", toggleNavBox);
    overLay.addEventListener("touchmove", (e) => {
        e.preventDefault();
    }, { passive: false });

    const plusBtn = document.querySelectorAll(".input-plus");
    plusBtn.forEach((button) => {
        button.addEventListener("click", (e) => quantityPlus(e));
    });

    const minusBtn = document.querySelectorAll(".input-minus");
    minusBtn.forEach((button) => {
        button.addEventListener("click", (e) => quantityMinus(e));
    });

    loggedInLink();
    deleteItem();
    calculateSum();
}

const toggleNavBox = () => {
    const navBox = document.querySelector(".nav-box");
    const overLay = document.querySelector(".overlay");
    const navBoxBtn = document.querySelector(".nav-box-close");
    navBox.classList.toggle("active");
    overLay.classList.toggle("active");
    navBoxBtn.classList.toggle("active");
}

const toggleOverlay = () => {
    const navBox = document.querySelector(".nav-box");
    const overLay = document.querySelector(".overlay");
    const navBoxBtn = document.querySelector(".nav-box-close");
    navBox.classList.toggle("active");
    overLay.classList.toggle("active");
    navBoxBtn.classList.toggle("active");
}

const quantityMinus = (e) => {
    e.preventDefault();
    var input = e.target.parentNode.querySelector(".input-quantity");
    var count = parseInt(input.value, 10) - 1;
    count = count < 0 ? 0 : count;
    input.value = count;
    var event = new Event('change', { 'bubbles': true });
    input.dispatchEvent(event);
    calculateSum();
}

const quantityPlus = (e) => {
    e.preventDefault();
    var input = e.target.parentNode.querySelector(".input-quantity");
    var count = parseInt(input.value, 10) + 1;
    count = count > 9 ? count - 1 : count;
    input.value = count;
    var event = new Event('change', { 'bubbles': true });
    input.dispatchEvent(event);
    calculateSum();
}

const loggedInLink = () => {
    const allCookies = document.cookie;
    const signedInLink = document.querySelector("#sign-in-link");
    const accessTokenMatch = allCookies.match(/accessTokenClient=([^;]*)/);
    const refreshTokenMatch = allCookies.match(/refreshTokenClient=([^;]*)/);

    const tokens = {
        accessTokenClient: accessTokenMatch ? accessTokenMatch[1] : null,
        refreshTokenClient: refreshTokenMatch ? refreshTokenMatch[1] : null
    };
    console.log(tokens);
    if (tokens.accessTokenClient === null) {
        signedInLink.href = "/signin";
        signedInLink.textContent = "🔓 Sign in";
        localStorage.clear();
    } else {
        signedInLink.href = "/signout";
        signedInLink.textContent = "🔒 Sign-out";
    }
}

const deleteItem = () => {
    document.querySelectorAll('.delete-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            var li = event.target.closest('.cart-item');
            var itemId = li.querySelector('#item-id').value;
            console.log('id: ' + itemId);

            if (itemId) {
                fetch("/cart", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ itemId: itemId }),
                }).then((res) => res.json())
                    .then(res => {
                        if (res.success) {
                            console.log(res.msg);
                            location.href = "/cart";
                        } else {
                            console.log("Failed to delete items Cart");
                        }
                    });
            } else {
                console.log("item-id not found");
            }
        });
    });
}

const calculateSum = () => {
    const items = document.querySelectorAll(".cart-item");
    const totalSum = document.querySelector("#total-sum");
    let result = 0;
    let partialSum = [];
    for (let i = 0; i < items.length; i++) {
        let price = document.querySelector(`#item${i}-price`).textContent;

        const itemSum = document.querySelector(`#item${i}-sum`);
        price = Number(price);
        let qty = document.querySelector(`#item${i}-quantity`);
        qty = qty.value;
        console.log(qty);
        partialSum[i] = Math.floor((price * qty) * 100) / 100;
        itemSum.textContent = "$ " + partialSum[i];
    }
    partialSum.forEach((e) => {
        result += e;
    })
    totalSum.textContent = "$ " + Math.floor(result * 100) / 100;
}


