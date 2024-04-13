class Dialog {
    constructor(dialogId, openId, closeId) {
        this.dialog = document.getElementById(dialogId);
        this.openButton = document.getElementById(openId);
        this.closeButton = document.getElementById(closeId);

        this.openButton.addEventListener("click", () => this.open());
        this.closeButton.addEventListener("click", () => this.close());
        this.dialog.addEventListener("click", (event) => this.closeIfClickedOutside(event));
    }

    open() {
        this.dialog.showModal();
        // Disable scrolling
        document.body.style.overflow = "hidden";
    }

    close() {
        this.dialog.close();
        // Enable scrolling
        document.body.style.overflow = "auto";
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