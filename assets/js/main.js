document.addEventListener("DOMContentLoaded", function () {
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

    // VIDEO DIALOG
    let videoDialog = document.getElementById("video-dialog");
    let videoDialogOpen = document.getElementById("video-dialog-open");
    let videoDialogClose = document.getElementById("video-dialog-close");

    videoDialogOpen.addEventListener("click", function () {
        videoDialog.showModal();
    });

    videoDialogClose.addEventListener("click", function () {
        videoDialog.close();
    });

    // Took from StackOverflow, it is optional anyway
    videoDialog.addEventListener("click", function (event) {
        var rect = videoDialog.getBoundingClientRect();
        var isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
            videoDialog.close();
        }
    });
});
