export class Product {
    pid: number;
    cid : number
    name: string;
    price: number;

    constructor(pid,cid, name, price) {
        this.pid = pid;
        this.cid = cid ;
        this.name = name;
        this.price = price;
    }

}