document.addEventListener("DOMContentLoaded", function () {
    // SCROLL TO TOP
    var windowH = window.innerHeight / 2;
    var scrollUp = document.getElementById("scroll-up");

    window.addEventListener("scroll", function () {
        if (window.scrollY > windowH) {
            scrollUp.style.opacity = "1";
        } else {
            scrollUp.style.opacity = "0";
        }
    });
});
