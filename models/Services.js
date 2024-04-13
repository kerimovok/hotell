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

    static validate(icon, title, content) {
        if (!icon) {
            throw new Error("Icon must not be empty");
        }

        if (title.length < 3) {
            throw new Error("Title must be at least 3 characters long");
        }

        if (content.length < 10) {
            throw new Error("Content must be at least 10 characters long");
        }
    }

    static id = 1;

    /**
     *
     * @param {string} icon
     * @param {string} title
     * @param {string} content
     */
    constructor(icon, title, content) {
        Service.validate(icon, title, content);

        this.icon = icon;
        this.title = title;
        this.content = content;
        this.id = Service.id++;
    }

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
        Service.servicesProxy = Service.servicesProxy.filter(
            (service) => service.id !== id,
        );
    }

    /**
     * Update a service
     * @param {number} id
     * @param {Service} service
     */
    static update(id, service) {
        Service.validate(service.icon, service.title, service.content);

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
                    <img src="${service.icon}" alt="${service.title}" />
                    <h5>${service.title}</h5>
                    <p>${service.content}</p>
                    <a href="#">Learn more</a>
                </div>
            `,
            )
            .join("");
    }
}
