/* Angular Modules */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { contact, contactSuccess } from '../../../store/actions/core.actions';
import { Actions, ofType } from '@ngrx/effects';

/* Services */
import { ContactFormService } from './services/contact-form.service';

/* FontAwesome */
import { faLifeRing } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

/* Lottie Animation */
import { AnimationOptions } from 'ngx-lottie';

import { ErrorMessages } from './contact-errors';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  options = [
    {
      name: 'Support',
      icon: faLifeRing,
      active: false
    },
    {
      name: 'Ventes',
      icon: faLaptop,
      active: false
    },
    {
      name: 'Autres',
      icon: faComment,
      active: false
    }
  ];
  lottie: AnimationOptions = {
    path: '../../../../assets/lottie/9688-origami-email-to-paper-plane-poof.json',
  };
  contactForm: FormGroup;
  errorMessages = ErrorMessages;
  value = 20;
  showError = false;

  constructor(private store: Store<AppState>, private _actions$: Actions, private contactFormService: ContactFormService) { }

  ngOnInit(): void {
    this.contactForm = this.contactFormService.buildForm();
  }

  get f() { return this.contactForm.controls; }

  activeItem(elem): void {
    for (const el of this.options) {
      if (el.active) {
        el.active = false;
      }
    }
    this.showError = false;
    elem.active = true;
    this.f.object.setValue(elem.name);
  }

  nextStep(): void {
    if (this.value === 20 && !this.f.object.value) {
      this.showError = true;
    } else if (this.value === 60 && !this.f.content.value) {
      this.f.content.markAsTouched();
    } else {
      this.value = this.value + 40;
    }
  }

  submit(): void {
    if (this.contactForm.invalid) {
      Object.keys(this.f).forEach((field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({onlySelf: true});
      }));
      return;
    }

    const data = {
      object: this.f.object.value,
      content: this.f.content.value,
      name: this.f.name.value,
      mail: this.f.email.value
    };

    this.store.dispatch(contact({data: data}));
    this._actions$.pipe(ofType(contactSuccess)).subscribe((data: any) => {
      this.value = 101;
    });
  }

}
