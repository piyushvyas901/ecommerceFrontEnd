import { Component, OnInit, OnDestroy,  ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, Product, ProductOrder } from '@app/_models';
import { UserService, AuthenticationService, EcommerceService } from '@app/_services';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CategoryComponent } from './category/category.component';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    products : Product[] = [] ;
    productOrders: ProductOrder[] = [];
    private collapsed = true;
    orderFinished = false;

    @ViewChild('categoryC')
    categoryC: CategoryComponent;

    @ViewChild('productsC')
    productsC: ProductsComponent;

    @ViewChild('shoppingCartC')
    shoppingCartC: ShoppingCartComponent;

    @ViewChild('ordersC')
    ordersC: OrdersComponent;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService, private ecommerceService: EcommerceService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }


    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

    finishOrder(orderFinished: boolean) {
        this.orderFinished = orderFinished;
    }

    reset() {
        this.orderFinished = false;
        this.productsC.reset();
        this.shoppingCartC.reset();
        this.ordersC.paid = false;
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    categoryEventClicked(products: Product[]) {
        this.productOrders = [] ;
        products.forEach(product => {
            this.productOrders.push(new ProductOrder(product, 0));
        })
    }

    onSelectedOption(e) {
        this.getFilteredProductList();
      }
    
      getFilteredProductList() {
        if (this.ecommerceService.searchOption.length > 0)
          this.products = this.ecommerceService.filteredListOptions();
        else {
          this.products = this.ecommerceService.SelectedCategory;
        }
        this.categoryEventClicked(this.products);
      }
}