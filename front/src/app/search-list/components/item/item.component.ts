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
import {addFavourite, getItem} from '../../../store/actions/core.actions';
import {selectAuthState, selectAuthUser} from '../../../store/reducers/auth.reducer';
import {User} from '../../../auth/models/user.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  itemData: Item;
  chart = null;
  chartLabel = [];
  chartPrice = [];
  user: User;
  isAuthenticated: boolean;
  selected = false;

  constructor(private store: Store<AppState>, private location: Location) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    this.store.pipe(select(selectAuthUser)).subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.store.pipe(select(selectItem)).subscribe(x => {
      this.itemData = x;
      this.chartLabel = [];
      this.chartPrice = [];
      this.itemData.prices.forEach(elem => {
        const price = elem.price.split(',')[0];
        this.chartLabel.push(elem.month);
        this.chartPrice.push(price);
      });

      if (this.chart) {
        this.chart.destroy();
        this.createChart();
      }
    });
    this.createChart();
    this.user.bookmarks.forEach(element => {
      if (element === this.itemData.name) {
        this.selected = true;
      }
    });
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

  price(nb): number {
    return parseInt(nb, 10);
  }

  navigate(item: Item): void {
    this.store.dispatch(getItem({name: item.name}));
  }

  back(): void {
    this.location.back();
  }
}
