import {Product} from "./product";
export class ProductOrder {
    product: Product;
    quantity: number;

    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
}