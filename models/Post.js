class Post {
    static posts = [];
    /**
     * Create a proxy to listen for changes in the posts array
     *
     * Basically, this proxy will call the render function whenever the posts array is changed
     */
    static postsProxy = new Proxy(this.posts, {
        set: function (target, property, value) {
            Post.render();

            // Setting the value into array
            target[property] = value;
            return true;
        },
    });

    static validate(image, title) {
        if (!image) {
            throw new Error("Icon must not be empty");
        }

        if (title.length < 3) {
            throw new Error("Title must be at least 3 characters long");
        }
    }

    static id = 1;

    /**
     *
     * @param {string} image
     * @param {string} title
     */
    constructor(image, title) {
        Post.validate(image, title);

        this.image = image;
        this.title = title;
        this.id = Post.id++;
        this.createdAt = new Date();
    }

    // region Lyfecycle methods
    /**
     * Lifecycle method, called when the posts are created
     */
    static onRender() {
        // Lifecycle method, called when the posts are rendered
    }
    // endregion

    // region Static methods
    /**
     * Get all posts
     * @returns {Post[]}
     */
    static getAll() {
        return Post.postsProxy;
    }

    /**
     * Find a post by id
     * @param {number} id
     * @returns {Post|null}
     */
    static findById(id) {
        return Post.postsProxy.find((post) => post.id === id) || null;
    }

    /**
     * Add new posts
     * @param {...Post} posts
     */
    static add(...posts) {
        Post.postsProxy.push(...posts);
    }

    /**
     * Delete a post by id
     * @param {number} id
     */
    static delete(id) {
        const index = Post.postsProxy.findIndex((post) => post.id === id);
        if (index !== -1) {
            Post.postsProxy.splice(index, 1);
        }
    }

    /**
     * Update a post
     * @param {number} id
     * @param {Post} post
     */
    static update(id, post) {
        Post.validate(post.image, post.title);

        const index = Post.postsProxy.findIndex(
            (existingPost) => existingPost.id === id,
        );
        if (index !== -1) {
            Post.postsProxy[index] = post;
        } else {
            throw new Error("Post not found");
        }
    }

    /**
     * Get the number of posts
     * @returns {number}
     */
    static count() {
        return Post.postsProxy.length;
    }

    /**
     * Empty the posts array
     */
    static empty() {
        Post.postsProxy = [];
    }

    /**
     * Sort posts by title
     * @param {('asc' | 'desc')} order
     */
    static sortByTitle(order = "asc") {
        Post.postsProxy.sort((a, b) => {
            if (order === "asc") {
                return a.title.localeCompare(b.title);
            }
            return b.title.localeCompare(a.title);
        });
        Post.render();
    }

    /**
     * Sort posts by id
     * @param {('asc' | 'desc')} order
     */
    static sortById(order = "asc") {
        Post.postsProxy = Post.postsProxy.sort((a, b) => {
            if (order === "asc") {
                return a.id - b.id;
            }
            return b.id - a.id;
        });
    }

    /**
     * Sort posts by date
     * @param {('asc' | 'desc')} order
     */
    static sortByDate(order = "asc") {
        Post.postsProxy = Post.postsProxy.sort((a, b) => {
            if (order === "asc") {
                return a.createdAt - b.createdAt;
            }
            return b.createdAt - a.createdAt;
        });
    }

    /**
     * Search posts by title
     * @param {string} title
     * @returns {Post[]}
     */
    static searchByTitle(title) {
        if (title.trim() === "") {
            Post.postsProxy = Post.posts.slice();
        } else {
            Post.postsProxy = Post.posts.filter((post) =>
                post.title.toLowerCase().includes(title.toLowerCase()),
            );
        }
        Post.render();
    }

    /**
     * Render posts
     * @param {Post[]} posts
     */
    static render(posts = Post.postsProxy) {
        const postsContainer = document.querySelector(".posts-content");

        postsContainer.innerHTML = posts
            .map(
                (post) => `
                    <div class="slider-item post-item">
                        <img src="${post.image}" alt="${post.title}" />
                        <div class="content">
                            <i class="fa fa-pen"></i>
                            <h4>${post.title}</h4>
                        <button data-post-id="${post.id}" class="delete-post">Delete</button>
                        <button data-post-id="${post.id}" class="post-dialog-open">Learn more</button>
                        </div>
                    </div>
                `,
            )
            .join("");

        Post.onRender();
    }
    // endregion
}
