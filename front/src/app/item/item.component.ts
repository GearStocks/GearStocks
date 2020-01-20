/* Angular modules */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* RxJs Dependencies */
import { Subscription } from 'rxjs';

/* Charts */
import { Chart } from 'chart.js';

/* Models */
import { Item } from './models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  itemData: Item;
  itemSubscription: Subscription;
  chart = [];
  chartLabel = [];
  chartPrice = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.itemSubscription = this.route.data
        .subscribe((data: Item) => {
          this.itemData = data['item'];
          data['item'].chartData.forEach(elem => {
            this.chartLabel.push(elem.month);
            this.chartPrice.push(elem.price);
          });
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
}
