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
        email: (['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]),
      }
    );
  }

}
