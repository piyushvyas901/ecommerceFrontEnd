import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EcommerceService } from "@app/_services";
import { Category, Product } from "@app/_models";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: Category[] = [];
  productCategory : Product[] = [] ;
  selectedCategory: Category;
  categotySelected: boolean = false;
  @Output() eventClicked = new EventEmitter<Product[]>();

  constructor(private ecommerceService: EcommerceService) {
  }

  ngOnInit() {
    this.categoryList = [];
    this.loadCategory();
  }
  loadCategory() {
    this.ecommerceService.getAllProductCategory()
      .subscribe(
        (categories: any[]) => {
          this.categoryList = categories;
          categories.forEach(value => {
            value.products.forEach(product => {
                this.productCategory.push(product); 
            });
        });
          this.ecommerceService.SelectedCategory = this.productCategory ;
        },
        (error) => console.log(error)
      );
  }

  showProducts(category: Category) {
    this.eventClicked.emit(category.products);
  }

}
