import crypto from "crypto";

export default class Cart {
    constructor(products = []) {
        this.id = crypto.randomUUID();
        this.products = products;
    }
}
