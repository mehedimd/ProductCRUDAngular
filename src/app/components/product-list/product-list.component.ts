import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  allProducts: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  // getAll product
  getAllProducts() {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.allProducts = res;
        console.log(res);
      },
      error: (e) => console.log(e),
    });
  }

  // delete product
  DeleteProduct(id: number) {
    this.productService.delete(id).subscribe({
      next: (data) => {
        console.log(data);
        this.ngOnInit();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
