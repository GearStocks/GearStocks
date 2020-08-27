/* Angular Modules */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-gearstocks-select',
  templateUrl: './gearstocks-select.component.html',
  styleUrls: ['./gearstocks-select.component.scss']
})
export class GearstocksSelectComponent implements OnChanges {
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() options: any;
  @Input() required: boolean;
  @Input() validationError: ValidationErrors;
  @Input() validationErrorMessages: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.validationError) {
      this.validationError = changes.validationError.currentValue;
    }
  }

  compareFn(op1: any, op2: any): boolean {
    return op1 && op2 ? op1.viewValue === op2.viewValue : op1 === op2;
  }

}
