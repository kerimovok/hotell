import $ from "../lib/$.js";

// region INITIALIZATION
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

// region DIALOG
let serviceDialog = new Dialog(
    "service-dialog",
    "service-dialog-open",
    "service-dialog-close",
);

// To stop the auto slide when the dialog is open
// serviceDialog.onOpen = () => servicesSlider.stopAutoSlide(false);
// To start the auto slide when the dialog is closed
// serviceDialog.onClose = () => servicesSlider.autoSlide();
// endregion

// region SLIDER
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

$.on("#add-service", "click", function () {
    // let title = prompt("Enter service title:");
    // let description = prompt("Enter service description:");
    // let image = prompt("Enter service image URL:");

    // I don't know any other way to do this without using nested promises
    Swal.mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
    })
        .fire({
            title: "Enter service title",
            text: "Please enter the title of the service",
        })
        .then((result) => {
            if (result.isConfirmed) {
                const title = result.value;
                Swal.fire({
                    title: "Enter service description",
                    text: "Please enter the description of the service",
                    input: "text",
                    confirmButtonText: "Next &rarr;",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        const description = result.value;
                        Swal.fire({
                            title: "Enter service image URL",
                            text: "Please enter the image URL of the service",
                            input: "text",
                            confirmButtonText: "Next &rarr;",
                            showCancelButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const image = result.value;
                                if (title && description && image) {
                                    // ACTUAL ADDING OF SERVICE
                                    try {
                                        Service.add(
                                            new Service(
                                                image,
                                                title,
                                                description,
                                            ),
                                        );
                                    } catch (e) {
                                        Swal.fire("Error", e.message, "error");
                                    }
                                }
                            } else {
                                Swal.fire(
                                    "Cancelled",
                                    "You cancelled the image URL prompt",
                                    "error",
                                );
                            }
                        });
                    } else {
                        Swal.fire(
                            "Cancelled",
                            "You cancelled the description prompt",
                            "error",
                        );
                    }
                });
            } else {
                Swal.fire(
                    "Cancelled",
                    "You cancelled the title prompt",
                    "error",
                );
            }
        });
});

// TODO: Bind to button itself without using a loop
function initServiceDialogOpenButton() {
    $.onAll(".service-dialog-open", "click", function () {
        let service = Service.findById(parseInt(this.dataset.serviceId));

        // Content of the dialog
        const serviceDialogContent = serviceDialog.dialog.querySelector(
            "#service-dialog-content",
        );
        serviceDialogContent.innerHTML = "";

        serviceDialogContent.innerHTML = `
                    <img src="${service.image}" alt="${service.title}" width="150" />
                    <h2>${service.title}</h2>
                    <p>${service.description}</p>
                    <span>${moment().calendar(service.createdAt)}</span>
                `;

        serviceDialog.open();
    });
}

// Got some god complex here, figured out the reason why the delete button is not working after first deletion
// It's because the event listener is not reattached to the delete buttons after the re-render 🤯
// Sounds pretty simple, huh?
function initServiceDeleteButton() {
    $.onAll(".delete-service", "click", function () {
        let serviceId = parseInt(this.dataset.serviceId);
        Service.delete(serviceId);
    });
}

Service.onRender = () => {
    initServiceDialogOpenButton();
    initServiceDeleteButton();
    // To fix the slider not working properly after re-render
    servicesSlider.stopAutoSlide();
    // To fix the slider not working properly after re-render
    servicesSlider.initItems();
};
initServiceDialogOpenButton();
initServiceDeleteButton();
// endregion
