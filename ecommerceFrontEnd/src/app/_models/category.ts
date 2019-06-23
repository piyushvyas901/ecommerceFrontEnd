import {Product} from "./product";
export class Category {
    cid: number;
    name: string;
    products : Product[]

    constructor(cid, name, products) {
        this.cid = cid;
        this.name = name;
        this.products = products;
    }

}