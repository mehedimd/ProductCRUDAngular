import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-addor-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-addor-update.component.html',
  styleUrl: './product-addor-update.component.css',
})
export class ProductAddorUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  id: number = 0;
  isEdit: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id > 0) {
      this.editProduct(this.id);
    }
  }

  productForm: any = this.formBuilder.group({
    productId: [0],
    productName: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
  });

  // Edit Product / Patch Value
  editProduct(id: number) {
    this.isEdit = true;
    this.productService.getById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.productForm.patchValue(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  productSubmit() {
    if (this.isEdit) {
      this.productService.update(this.productForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/products']);
        },
        error: (e) => console.log(e),
      });
    } else {
      this.productService.create(this.productForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/products']);
        },
        error: (e) => console.log(e),
      });
    }
  }
}
