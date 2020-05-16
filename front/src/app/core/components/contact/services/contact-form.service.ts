/* Angular Modules */
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(private formBuilder: FormBuilder) { }

  buildForm(): FormGroup {
    return this.formBuilder.group({
        object: ([null, [Validators.required]]),
        content: ([null, [Validators.required]]),
        name: (['', [Validators.required, Validators.minLength(2)]]),
        email: (['', [Validators.required, Validators.email]]),
      }
    );
  }

}
