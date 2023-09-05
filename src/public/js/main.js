
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

    /*  //not working maybe later
        document.addEventListener('click', () => {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken + "dom");
        if (refreshToken) {
            getNewAccessToken(refreshToken);
        }
    }); */

    loggedInLink();
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

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

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


/* Refresh Token Function. not complete. Later
async function getNewAccessToken(refreshToken) {
    if (refreshToken) {
        try {
            fetch('/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken: refreshToken })
            }).then((res) => res.json())
                .then(res => {
                    if (res.success) {
                        localStorage.setItem('refreshToken', res.refreshToken);
                    }
                })
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }
} */

const logOut = () => {
    localStorage.clear();
}