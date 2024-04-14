/**
 * A simple class to handle DOM manipulation
 * Inspired by jQuery ☠
 */
export default class $ {
    static get(selector) {
        return document.querySelector(selector);
    }

    static getAll(selector) {
        return document.querySelectorAll(selector);
    }

    static on(selector, event, callback) {
        $.get(selector).addEventListener(event, callback);
    }

    // Could be merged with on() method using a default parameter or with if statement
    static onAll(selector, event, callback) {
        $.getAll(selector).forEach((element) =>
            element.addEventListener(event, callback),
        );
    }
}
