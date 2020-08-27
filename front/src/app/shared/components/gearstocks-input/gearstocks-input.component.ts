/* Angular Modules */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-gearstocks-input',
  templateUrl: './gearstocks-input.component.html',
  styleUrls: ['./gearstocks-input.component.scss']
})
export class GearstocksInputComponent implements OnInit, OnChanges {
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() validationError: ValidationErrors;
  @Input() validationErrorMessages: any;
  today: string;

  constructor() { }

  ngOnInit(): void {
    if (this.type === 'date') {
      this.today = new Date().toJSON().split('T')[0];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.validationError) {
      this.validationError = changes.validationError.currentValue;
    }
  }

}
