/* Angular Modules */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Subscription } from 'rxjs';

/* Services */
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-gearstocks-alert',
  templateUrl: './gearstocks-alert.component.html',
  styleUrls: ['./gearstocks-alert.component.scss']
})
export class GearstocksAlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close(): void {
    this.alertService.clear();
  }
}
