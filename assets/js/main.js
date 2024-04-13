document.addEventListener("DOMContentLoaded", function () {
    // HEADER
    let header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 5) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });

    // SCROLL TO TOP
    let windowH = window.innerHeight / 2;
    let scrollUp = document.getElementById("scroll-up");

    window.addEventListener("scroll", function () {
        if (window.scrollY > windowH) {
            scrollUp.style.opacity = "1";
        } else {
            scrollUp.style.opacity = "0";
        }
    });

    // DIALOGS
    let videoDialog = new Dialog(
        "video-dialog",
        "video-dialog-open",
        "video-dialog-close",
    );

    // SLIDERS
    let servicesSlider = new Slider(
        ".services-container",
        ".services-content",
        ".service-item",
        ".services-btn-prev",
        ".services-btn-next",

        30,
        3000,
        3.3,
        1,
    );
    let postsSlider = new Slider(
        ".posts-container",
        ".posts-content",
        ".post-item",
        ".posts-btn-prev",
        ".posts-btn-next",
        30,
        3000,
        3,
        1,
    );
    let testimonialsSlider = new Slider(
        ".testimonials-container",
        ".testimonials-content",
        ".testimonial-item",
        ".testimonials-btn-prev",
        ".testimonials-btn-next",
        30,
        3000,
        3,
        1,
    );
    let imagesSlider = new Slider(
        ".images-container",
        ".images-content",
        ".image-item",
        ".images-btn-prev",
        ".images-btn-next",
        0,
        3000,
        5,
        1,
    );

    // ACCORDIONS
    let myAccordion = new Accordion(
        ".accordion-item",
        ".accordion-button",
        ".accordion-body",
    );
});
