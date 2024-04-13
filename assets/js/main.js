import $ from "./lib/$.js";

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

    // region SERVICES
    const service1 = new Service(
        "./assets/media/icons/trekking.png",
        "A Trekking",
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia there live the blind texts.",
    );
    const service2 = new Service(
        "./assets/media/icons/trekking.png",
        "B Trekking",
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia there live the blind texts.",
    );
    const service3 = new Service(
        "./assets/media/icons/trekking.png",
        "C Trekking",
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia there live the blind texts.",
    );
    const service4 = new Service(
        "./assets/media/icons/trekking.png",
        "D Trekking",
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia there live the blind texts.",
    );
    const service5 = new Service(
        "./assets/media/icons/trekking.png",
        "E AITA",
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia there live the blind texts.",
    );
    const service6 = new Service(
        "./assets/media/icons/trekking.png",
        "F AITA",
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia there live the blind texts.",
    );

    Service.add(service1, service2, service3, service4, service5, service6);
    // endregion

    // region DIALOGS
    let videoDialog = new Dialog(
        "video-dialog",
        "video-dialog-open",
        "video-dialog-close",
    );
    // endregion

    // region SLIDERS
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
    // endregion

    // region ACCORDIONS
    let myAccordion = new Accordion(
        ".accordion-item",
        ".accordion-button",
        ".accordion-body",
    );
    // endregion

    // region EVENTS
    $.on("#search-service", "input", function () {
        Service.searchByTitle(this.value);
        servicesSlider.stopAutoSlide();
    });

    $.on("#sort-services-alpha-down", "click", function () {
        Service.sortByTitle("asc");
        servicesSlider.stopAutoSlide();
    });

    $.on("#sort-services-alpha-up", "click", function () {
        Service.sortByTitle("desc");
        servicesSlider.stopAutoSlide();
    });
    // endregion
});
