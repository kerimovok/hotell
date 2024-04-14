document.addEventListener("DOMContentLoaded", function () {
    // region FORMS
    document
        .querySelectorAll("form")
        .forEach((form) =>
            form.addEventListener("submit", (e) => e.preventDefault()),
        );
    // endregion

    // region HEADER
    let header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 5) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });
    // endregion

    // region SCROLL TO TOP
    let windowH = window.innerHeight / 2;
    let scrollUp = document.getElementById("scroll-up");

    window.addEventListener("scroll", function () {
        if (window.scrollY > windowH) {
            scrollUp.style.opacity = "1";
        } else {
            scrollUp.style.opacity = "0";
        }
    });
    // endregion

    // region DIALOGS
    let videoDialog = new Dialog(
        "video-dialog",
        "video-dialog-open",
        "video-dialog-close",
    );
    // endregion

    // region ACCORDIONS
    let myAccordion = new Accordion(
        ".accordion-item",
        ".accordion-button",
        ".accordion-body",
    );
    // endregion
});
