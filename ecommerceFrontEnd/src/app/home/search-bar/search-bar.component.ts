import { Component, OnInit, ViewChild, ElementRef,EventEmitter,Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {Subscription} from "rxjs/internal/Subscription";
import { Product } from '@app/_models';
import { EcommerceService } from '@app/_services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allProduct: Product[];
  autoCompleteList: any[] ;
  sub: Subscription; 

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    private ecommerceService: EcommerceService
  ) { }

  ngOnInit() {
    this.sub = this.ecommerceService.CategoryLoaded.subscribe(() => {
      this.allProduct  = this.ecommerceService.SelectedCategory;
    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allProduct.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allProduct;
  }

  displayFn(product: Product) {
    let k = product ? product.name : product;
    return k;
  }

  filterProductList(event) {
    var product = event.source.value;
    if (!product) {
      this.ecommerceService.searchOption = []
    }
    else {
      this.ecommerceService.searchOption.push(product);
      this.onSelectedOption.emit(this.ecommerceService.searchOption)
    }
    this.focusOnPlaceInput();
  }


  removeOption(option) {
    let index = this.ecommerceService.searchOption.indexOf(option);
    if (index >= 0)
      this.ecommerceService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.ecommerceService.searchOption)
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }



}
