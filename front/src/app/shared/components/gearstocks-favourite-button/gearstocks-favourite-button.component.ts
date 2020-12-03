import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gearstocks-favourite-button',
  templateUrl: './gearstocks-favourite-button.component.html',
  styleUrls: ['./gearstocks-favourite-button.component.scss']
})
export class GearstocksFavouriteButtonComponent implements OnInit {
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

}
