import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from '../services/categories.service';

@Injectable()
export class CategoriesResolver implements Resolve<any> {
  constructor(private categoriesService: CategoriesService) {}

  resolve(): Observable<any> {
    return this.categoriesService.getCategories();
  }
}
