import {ProductOrder, ProductOrders, Product, Category} from "@app/_models";
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class EcommerceService {
    private productsUrl = "/api/products";
    private ordersUrl = "/api/orders";
    private categoryUrl = "/api/categories";
    private addToCartUrl = "/api/addtocart";
    private removeFromCartUrl = "/api/removeFromCart";

    searchOption=[];

    private productOrder: ProductOrder;
    private productCategory :  Product[] ;
    private orders: ProductOrders = new ProductOrders();

    private categorySubject = new Subject();
    private productOrderSubject = new Subject();
    private ordersSubject = new Subject();
    private totalSubject = new Subject();

    private total: number;

    CategoryLoaded = this.categorySubject.asObservable();
    ProductOrderChanged = this.productOrderSubject.asObservable();
    OrdersChanged = this.ordersSubject.asObservable();
    TotalChanged = this.totalSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    getAllProducts() {
        return this.http.get(this.productsUrl);
    }

    getAllProductCategory() {
        /* let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Username', "test");
        headers.append('Password', "password"); */
        return this.http.get(this.categoryUrl);
      }

      saveOrder(order: ProductOrders) {
        return this.http.post(this.ordersUrl, order);
    }

    addTocart(productOrder: ProductOrder) {
        return this.http.post(this.addToCartUrl, productOrder);
    }

    removeFromcart(productOrder: ProductOrder) {
        let removeFromCarid = this.removeFromCartUrl+productOrder.product.pid ;
        return this.http.delete(removeFromCarid);
    }

    filteredListOptions() {
        let products = this.productCategory;
            let filteredProductList = [];
            for (let product of products) {
                for (let options of this.searchOption) {
                    if (options.name === product.name) {
                        filteredProductList.push(product);
                    }
                }
            }
            return filteredProductList;
      }

    set SelectedCategory(values: Product[]) {
        this.productCategory = values;
        this.categorySubject.next();
    }

    get SelectedCategory() {
        return this.productCategory;
    }
    
    set SelectedProductOrder(value: ProductOrder) {
        this.productOrder = value;
        this.productOrderSubject.next();
    }

    get SelectedProductOrder() {
        return this.productOrder;
    }

    set ProductOrders(value: ProductOrders) {
        this.orders = value;
        this.ordersSubject.next();
    }

    get ProductOrders() {
        return this.orders;
    }

    get Total() {
        return this.total;
    }

    set Total(value: number) {
        this.total = value;
        this.totalSubject.next();
    }
}