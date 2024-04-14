class Service {
    static services = [];
    /**
     * Create a proxy to listen for changes in the services array
     *
     * Basically, this proxy will call the render function whenever the services array is changed
     */
    static servicesProxy = new Proxy(this.services, {
        set: function (target, property, value) {
            Service.render();

            // Setting the value into array
            target[property] = value;
            return true;
        },
    });

    static validate(image, title, description) {
        if (!image) {
            throw new Error("Icon must not be empty");
        }

        if (title.length < 3) {
            throw new Error("Title must be at least 3 characters long");
        }

        if (description.length < 10) {
            throw new Error("Content must be at least 10 characters long");
        }
    }

    static id = 1;

    /**
     *
     * @param {string} image
     * @param {string} title
     * @param {string} description
     */
    constructor(image, title, description) {
        Service.validate(image, title, description);

        this.image = image;
        this.title = title;
        this.description = description;
        this.id = Service.id++;
        this.createdAt = new Date();
    }

    // region Lyfecycle methods
    /**
     * Lifecycle method, called when the services are created
     */
    static onRender() {
        // Lifecycle method, called when the services are rendered
    }
    // endregion

    // region Static methods
    /**
     * Get all services
     * @returns {Service[]}
     */
    static getAll() {
        return Service.servicesProxy;
    }

    /**
     * Find a service by id
     * @param {number} id
     * @returns {Service|null}
     */
    static findById(id) {
        return (
            Service.servicesProxy.find((service) => service.id === id) || null
        );
    }

    /**
     * Add new services
     * @param {...Service} services
     */
    static add(...services) {
        Service.servicesProxy.push(...services);
    }

    /**
     * Delete a service by id
     * @param {number} id
     */
    static delete(id) {
        const index = Service.servicesProxy.findIndex(
            (service) => service.id === id,
        );
        if (index !== -1) {
            Service.servicesProxy.splice(index, 1);
        }
    }

    /**
     * Update a service
     * @param {number} id
     * @param {Service} service
     */
    static update(id, service) {
        Service.validate(service.image, service.title, service.description);

        const index = Service.servicesProxy.findIndex(
            (existingService) => existingService.id === id,
        );
        if (index !== -1) {
            Service.servicesProxy[index] = service;
        } else {
            throw new Error("Service not found");
        }
    }

    /**
     * Get the number of services
     * @returns {number}
     */
    static count() {
        return Service.servicesProxy.length;
    }

    /**
     * Empty the services array
     */
    static empty() {
        Service.servicesProxy = [];
    }

    /**
     * Sort services by title
     * @param {('asc' | 'desc')} order
     */
    static sortByTitle(order = "asc") {
        Service.servicesProxy.sort((a, b) => {
            if (order === "asc") {
                return a.title.localeCompare(b.title);
            }
            return b.title.localeCompare(a.title);
        });
        Service.render();
    }

    /**
     * Sort services by id
     * @param {('asc' | 'desc')} order
     */
    static sortById(order = "asc") {
        Service.servicesProxy = Service.servicesProxy.sort((a, b) => {
            if (order === "asc") {
                return a.id - b.id;
            }
            return b.id - a.id;
        });
    }

    /**
     * Sort services by date
     * @param {('asc' | 'desc')} order
     */
    static sortByDate(order = "asc") {
        Service.servicesProxy = Service.servicesProxy.sort((a, b) => {
            if (order === "asc") {
                return a.createdAt - b.createdAt;
            }
            return b.createdAt - a.createdAt;
        });
    }

    /**
     * Search services by title
     * @param {string} title
     * @returns {Service[]}
     */
    static searchByTitle(title) {
        if (title.trim() === "") {
            Service.servicesProxy = Service.services.slice();
        } else {
            Service.servicesProxy = Service.services.filter((service) =>
                service.title.toLowerCase().includes(title.toLowerCase()),
            );
        }
        Service.render();
    }

    /**
     * Render services
     * @param {Service[]} services
     */
    static render(services = Service.servicesProxy) {
        const servicesContainer = document.querySelector(".services-content");

        servicesContainer.innerHTML = services
            .map(
                (service) => `
                    <div class="slider-item service-item">
                        <img src="${service.image}" alt="${service.title}" />
                        <h5>${service.title}</h5>
                        <p>${service.description}</p>
                        <button data-service-id="${service.id}" class="service-dialog-open">Learn more</button>
                        <button data-service-id="${service.id}" class="delete-service">Delete</button>
                    </div>
                `,
            )
            .join("");

        Service.onRender();
    }
    // endregion
}
