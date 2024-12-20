import crypto from "crypto";

export default class Product {
    constructor(
        title,
        description,
        code,
        price,
        category,
        status = true,
        thumbnails = ["sample.jpg"]
    ) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.category = category;
        this.status = status;
        this.thumbnails = thumbnails;
    }
}
