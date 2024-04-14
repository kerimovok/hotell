import $ from "../lib/$.js";

// region INITIALIZATION
const post1 = new Post(
    "./assets/media/images/img_1.jpg",
    "A Far far away, behind the word mountains, far from the countries",
);
const post2 = new Post(
    "./assets/media/images/img_2.jpg",
    "B Far far away, behind the word mountains, far from the countries",
);
const post3 = new Post(
    "./assets/media/images/img_3.jpg",
    "C Far far away, behind the word mountains, far from the countries",
);
const post4 = new Post(
    "./assets/media/images/img_4.jpg",
    "D Far far away, behind the word mountains, far from the countries",
);
const post5 = new Post(
    "./assets/media/images/img_1.jpg",
    "E Far far away, behind the word mountains, far from the countries",
);
const post6 = new Post(
    "./assets/media/images/img_2.jpg",
    "F Far far away, behind the word mountains, far from the countries",
);
const post7 = new Post(
    "./assets/media/images/img_3.jpg",
    "G Far far away, behind the word mountains, far from the countries",
);
const post8 = new Post(
    "./assets/media/images/img_4.jpg",
    "H Far far away, behind the word mountains, far from the countries",
);

Post.add(post1, post2, post3, post4, post5, post6, post7, post8);
// endregion

// region DIALOG
let postDialog = new Dialog(
    "post-dialog",
    "post-dialog-open",
    "post-dialog-close",
);

// To stop the auto slide when the dialog is open
// postDialog.onOpen = () => postsSlider.stopAutoSlide(false);
// To start the auto slide when the dialog is closed
// postDialog.onClose = () => postsSlider.autoSlide();
// endregion

// region SLIDER
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
// endregion

// region EVENTS
$.on("#search-post", "input", function () {
    Post.searchByTitle(this.value);
    postsSlider.stopAutoSlide();
});

$.on("#sort-posts-alpha-down", "click", function () {
    Post.sortByTitle("asc");
    postsSlider.stopAutoSlide();
});

$.on("#sort-posts-alpha-up", "click", function () {
    Post.sortByTitle("desc");
    postsSlider.stopAutoSlide();
});

$.on("#add-post", "click", function () {
    // I don't know any other way to do this without using nested promises
    Swal.mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
    })
        .fire({
            title: "Enter post title",
            text: "Please enter the title of the post",
        })
        .then((result) => {
            if (result.isConfirmed) {
                const title = result.value;

                Swal.fire({
                    title: "Enter post image URL",
                    text: "Please enter the image URL of the post",
                    input: "text",
                    confirmButtonText: "Next &rarr;",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        const image = result.value;
                        if (title && image) {
                            // ACTUAL ADDING OF POST
                            try {
                                Post.add(new Post(image, title));
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
                    "You cancelled the title prompt",
                    "error",
                );
            }
        });
});

// TODO: Bind to button itself without using a loop
function initPostDialogOpenButton() {
    $.onAll(".post-dialog-open", "click", function () {
        let post = Post.findById(parseInt(this.dataset.postId));

        // Content of the dialog
        const postDialogContent = postDialog.dialog.querySelector(
            "#post-dialog-content",
        );
        postDialogContent.innerHTML = "";

        postDialogContent.innerHTML = `
                    <img src="${post.image}" alt="${post.title}" width="150" />
                    <h2>${post.title}</h2>
                    <span>${moment().calendar(post.createdAt)}</span>
                `;

        postDialog.open();
    });
}

// Got some god complex here, figured out the reason why the delete button is not working after first deletion
// It's because the event listener is not reattached to the delete buttons after the re-render 🤯
// Sounds pretty simple, huh?
function initPostDeleteButton() {
    $.onAll(".delete-post", "click", function () {
        let postId = parseInt(this.dataset.postId);
        Post.delete(postId);
    });
}

Post.onRender = () => {
    initPostDialogOpenButton();
    initPostDeleteButton();
    // To fix the slider not working properly after re-render
    postsSlider.stopAutoSlide();
    // To fix the slider not working properly after re-render
    postsSlider.initItems();
};
initPostDialogOpenButton();
initPostDeleteButton();
// endregion
