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
    })
    const minusBtn = document.querySelectorAll(".input-minus");
    minusBtn.forEach((button) => {
        button.addEventListener("click", (e) => quantityMinus(e));
    })


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