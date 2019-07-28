/* Angular Modules */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-gearstocks-input',
  templateUrl: './gearstocks-input.component.html',
  styleUrls: ['./gearstocks-input.component.scss']
})
export class GearstocksInputComponent implements OnChanges {
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() validationError: ValidationErrors;
  @Input() validationErrorMessages: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.validationError) {
      this.validationError = changes.validationError.currentValue;
    }
  }

}
