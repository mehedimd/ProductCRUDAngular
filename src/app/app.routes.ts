import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddorUpdateComponent } from './components/product-addor-update/product-addor-update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'product/add', component: ProductAddorUpdateComponent },
  { path: 'product/add/:id', component: ProductAddorUpdateComponent },
];
