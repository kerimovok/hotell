/**
 * A simple class to handle DOM manipulation
 * Inspired by jQuery ☠
 */
export default class $ {
    constructor(selector) {
        this.element = $.get(selector);
    }

    on(event, callback) {
        this.element.addEventListener(event, callback);
    }

    static get(selector) {
        return document.querySelector(selector);
    }

    static on(selector, event, callback) {
        $.get(selector).addEventListener(event, callback);
    }
}
