class Dialog {
    constructor(dialogId, openButtonId, closeButtonId) {
        this.dialog = document.getElementById(dialogId);
        this.openButton = document.getElementById(openButtonId);
        this.closeButton = document.getElementById(closeButtonId);

        if (this.openButton)
            this.openButton.addEventListener("click", () => this.open());
        if (this.closeButton)
            this.closeButton.addEventListener("click", () => this.close());
        this.dialog.addEventListener("click", (event) =>
            this.closeIfClickedOutside(event),
        );
    }

    // For multiple buttons
    // constructor(dialogSelector, openButtonsSelector, closeButtonsSelector) {
    //     this.dialog = document.querySelector(dialogSelector);
    //     this.openButtons = document.querySelectorAll(openButtonsSelector);
    //     this.closeButtons = document.querySelectorAll(closeButtonsSelector);
    //
    //     this.openButtons.forEach((button) =>
    //         button.addEventListener("click", () => this.open()),
    //     );
    //     this.closeButtons.forEach((button) =>
    //         button.addEventListener("click", () => this.close()),
    //     );
    //     this.dialog.addEventListener("click", (event) =>
    //         this.closeIfClickedOutside(event),
    //     );
    // }

    onOpen() {
        // Lifecycle method, called when the dialog is opened
    }

    onClose() {
        // Lifecycle method, called when the dialog is closed
    }

    open() {
        this.dialog.showModal();
        // Disable scrolling
        document.body.style.overflow = "hidden";
        this.onOpen();
    }

    close() {
        this.dialog.close();
        // Enable scrolling
        document.body.style.overflow = "auto";
        this.onClose();
    }

    // Took from StackOverflow, it is optional anyway
    // https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop
    closeIfClickedOutside(event) {
        let rect = this.dialog.getBoundingClientRect();
        let isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
            this.close();
        }
    }
}
