/* Angular modules */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { selectItem } from '../../../store/reducers/core.reducer';

/* Charts */
import { Chart } from 'chart.js';

/* Models */
import { Item } from './models/item.model';
import {addFavourite} from '../../../store/actions/core.actions';
import {selectAuthState} from '../../../store/reducers/auth.reducer';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  itemData: Item;
  chart = [];
  chartLabel = [];
  chartPrice = [];
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>, private location: Location) {
    this.store.pipe(select(selectItem)).subscribe(x => this.itemData = x);
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
  }

  ngOnInit(): void {
    this.itemData.prices.forEach(elem => {
      this.chartLabel.push(elem.month);
      this.chartPrice.push(elem.price);
    });
    this.createChart();
  }

  createChart(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.chartLabel,
        datasets: [
          {
            data: this.chartPrice,
            backgroundColor: 'red',
            borderColor: 'orange',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Prix de la pièce sur les 12 derniers mois'
        },
        tooltips: {
          intersect: false,
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  selectChange(event): void {
    if (event) {
      this.store.dispatch(addFavourite({name: this.itemData.name}));
    }
  }

  back(): void {
    this.location.back();
  }
}
