document.addEventListener("DOMContentLoaded", () => {
    initApp();
})

const initApp = () => {
    const navBox = document.querySelector(".nav");
    const overLay = document.querySelector(".overlay");
    const navBoxBtn = document.querySelector(".nav-box-close");
    const signedInLink = document.querySelector("#sign-in-link");

    signedInLink.addEventListener("click", logOut);
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
    addToCart();
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
}

const quantityPlus = (e) => {
    e.preventDefault();
    var input = e.target.parentNode.querySelector(".input-quantity");
    var count = parseInt(input.value, 10) + 1;
    count = count > 9 ? count - 1 : count;
    input.value = count;
    var event = new Event('change', { 'bubbles': true });
    input.dispatchEvent(event);
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
    console.log(localStorage.getItem('refreshToken' + "Hello Local storage"));
    if (localStorage.getItem('refreshToken') === null) {
        signedInLink.href = "/signin";
        signedInLink.textContent = "🔓 Sign in";
    } else {
        signedInLink.href = "/signout";
        signedInLink.textContent = "🔒 Sign-out";

    }
}

const addToCart = () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            var li = event.target.closest('.pizza-item');

            var itemName = li.querySelector('.pizza-item-name').textContent;
            console.log('Name:', itemName);
            var size = li.querySelector('input[name$="-size"]:checked').value;
            console.log('Size:', typeof size);
            var quantity = li.querySelector('.input-quantity').value;
            quantity = Number(quantity);
            console.log('Quantity:', typeof quantity);
            var price;
            if (size === "M") {
                price = li.querySelector('#mPrice').textContent;
                price = Number(price);
            }
            else if (size === "L") {
                price = li.querySelector('#lPrice').textContent;
                price = Number(price);
                console.log(price);
            }

            const request = {
                itemName: itemName,
                size: size,
                quantity: quantity,
                price: price
            };

            if (itemName && size && quantity) {
                fetch("/cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request),
                }).then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            alert(`${res.itemName}(${res.size}) Added To Cart`);
                        } else {
                            if (res.location) {
                                location.href = `${res.location}`
                            }
                            else { alert("Failed to Add items Cart"); }
                        }
                    }).catch(err => console.log);
            } else {
                if (!size) alert("size must be selected");
                else if (!quantity) alert("quantity must be greater than 0");
            }
        });
    });
}


const logOut = () => {
    localStorage.clear();
}