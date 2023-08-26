document.addEventListener("DOMContentLoaded", () => {
    initApp();
})

const initApp = () => {
    const navBox = document.querySelector(".nav");
    const overLay = document.querySelector(".overlay");
    const navBoxBtn = document.querySelector(".nav-box-close");
    const orderBtn = document.querySelector(".order-btn");
    overLay.addEventListener("click", toggleOverlay);
    navBox.addEventListener("click", toggleNavBox);
    navBoxBtn.addEventListener("click", toggleNavBox);
    overLay.addEventListener("touchmove", (e) => {
        e.preventDefault();
    }, { passive: false });
    orderBtn.addEventListener("click", submitOrder);

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
        partialSum[i] = Math.floor((price * qty) * 100) / 100;
        itemSum.textContent = "$ " + partialSum[i];
    }
    partialSum.forEach((e) => {
        result += e;
    })
    totalSum.textContent = "$ " + Math.floor(result * 100) / 100;
}

const submitOrder = () => {
    const items = document.querySelectorAll(".cart-item");
    const totalSum = document.querySelector("#total-sum");
    let orders = [];

    let result = 0;
    let partialSum = [];
    for (let i = 0; i < items.length; i++) {
        let itemInfo = {};
        let itemName = document.querySelector(`#item${i}-name`).textContent;
        let size = document.querySelector(`#item${i}-size`).textContent;
        let price = document.querySelector(`#item${i}-price`).textContent;
        const itemSum = document.querySelector(`#item${i}-sum`);
        price = Number(price);
        let qty = document.querySelector(`#item${i}-quantity`);
        qty = qty.value;
        partialSum[i] = Math.floor((price * qty) * 100) / 100;
        itemSum.textContent = "$ " + partialSum[i];
        itemInfo.itemName = itemName.trim();
        itemInfo.size = size.trim();
        itemInfo.quantity = Number(qty);
        itemInfo.price = price;
        orders.push(itemInfo);
    }
    partialSum.forEach((e) => {
        result += e;
    })
    let totalSumValue = Math.floor(result * 100) / 100;
    totalSum.textContent = "$ " + Math.floor(result * 100) / 100;
    console.log(orders);

    fetch("/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "orders": orders, "sum": totalSumValue })
    }).then((res) => res.json())
        .then(res => {
            if (res.success) {
                alert("Order Submitted!");
                location.href = "/";
            } else {
                alert(res.message);
            }
        }).catch(err => {
            console.error(res.msg);
        });
}
