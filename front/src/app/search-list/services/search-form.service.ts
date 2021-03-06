import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {

  constructor(private formBuilder: FormBuilder) { }

  buildForm(): FormGroup {
    return this.formBuilder.group({
        keyWord: ([null]),
        category: (['']),
        subCategory: (['']),
        model: (['']),
        brand: (['']),
        range: ([[0, 15000]])
      }
    );
  }
}
