class Service {
    static services = [];
    // Create a proxy to listen for changes in the services array
    // Basically, this proxy will call the render function whenever the services array is changed
    static servicesProxy = new Proxy(this.services, {
        set: function (target, property, value) {
            Service.render();

            // Setting the value in the array
            target[property] = value;
            return true;
        },
    });

    static id = 1;
    constructor(icon, title, content) {
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
        return this.servicesProxy;
    }

    /**
     * Find a service by id
     * @param {number} id
     * @returns {Service|undefined}
     */
    static findById(id) {
        return this.servicesProxy.find((service) => service.id === id);
    }

    /**
     * Add new services
     * @param {...Service} services
     */
    static add(...services) {
        this.servicesProxy.push(...services);
    }
    /**
     * Delete a service by id
     * @param {number} id
     */
    static delete(id) {
        this.servicesProxy = this.servicesProxy.filter(
            (service) => service.id !== id,
        );
    }

    /**
     * Update a service
     * @param {number} id
     * @param {Service} service
     */
    static update(id, service) {
        const index = this.servicesProxy.findIndex(
            (service) => service.id === id,
        );
        this.servicesProxy[index] = service;
    }

    /**
     * Get the number of services
     * @returns {number}
     */
    static count() {
        return this.servicesProxy.length;
    }

    /**
     * Empty the services array
     */
    static empty() {
        this.servicesProxy = [];
    }

    /**
     * Sort services by title
     * @param {('asc' | 'desc')} order
     */
    static sortByTitle(order = "asc") {
        this.servicesProxy = this.servicesProxy.sort((a, b) => {
            if (order === "asc") {
                return a.title.localeCompare(b.title);
            }
            return b.title.localeCompare(a.title);
        });
    }

    /**
     * Sort services by id
     * @param {('asc' | 'desc')} order
     */
    static sortById(order = "asc") {
        this.servicesProxy = this.servicesProxy.sort((a, b) => {
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
        return this.servicesProxy.filter((service) =>
            service.title
                .trim()
                .toLowerCase()
                .includes(title.trim().toLowerCase()),
        );
    }

    static render() {
        const servicesContainer = document.querySelector(".services-content");

        servicesContainer.innerHTML = this.servicesProxy
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
