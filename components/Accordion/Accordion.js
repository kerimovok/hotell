class Accordion {
    constructor(accordionItemClass, accordionButtonClass, accordionBodyClass) {
        this.accordionItems = document.querySelectorAll(accordionItemClass);
        this.accordionButtons = document.querySelectorAll(accordionButtonClass);
        this.accordionBodyClass = accordionBodyClass;

        this.accordionButtons.forEach((button) => {
            button.addEventListener("click", () =>
                this.toggleAccordion(button),
            );
        });
    }

    toggleAccordion(button) {
        const accordionItem = button.closest(".accordion-item");
        const accordionBody = accordionItem.querySelector(
            this.accordionBodyClass,
        );

        this.accordionItems.forEach((item) => {
            if (item !== accordionItem) {
                item.querySelector(this.accordionBodyClass).classList.add(
                    "collapsed",
                );
            }
        });

        accordionBody.classList.toggle("collapsed");
    }
}
