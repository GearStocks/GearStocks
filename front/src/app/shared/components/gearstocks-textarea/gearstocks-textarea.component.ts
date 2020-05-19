/* Angular Modules */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-gearstocks-textarea',
  templateUrl: './gearstocks-textarea.component.html',
  styleUrls: ['./gearstocks-textarea.component.scss']
})
export class GearstocksTextareaComponent implements OnChanges {
  @Input() group: FormGroup;
  @Input() name: string;
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
