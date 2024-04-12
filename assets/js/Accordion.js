document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", () => {
        const accordionItem = button.closest(".accordion-item");
        const accordionBody = accordionItem.querySelector(".accordion-body");

        document.querySelectorAll(".accordion-item").forEach((item) => {
            if (item !== accordionItem) {
                item.querySelector(".accordion-body").classList.add(
                    "collapsed",
                );
            }
        });

        accordionBody.classList.toggle("collapsed");
    });
});
