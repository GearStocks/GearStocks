/* Angular Modules */
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent {
  @Input() errorPrefix: string;
  @Input() errors: ValidationErrors;
  @Input() name: string;

  constructor() { }

}
