/* Angular Modules */
import {AfterViewInit, Component, EventEmitter, ViewChild} from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { search } from '../../../store/actions/core.actions';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

/* Material Angular */
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit{
  @ViewChild('menu') menu!: MatMenu;

  video = 'assets/video/gearstocks.mp4';
  keyword: string;
  value = 0;
  highValue = 15000;
  range = [0, 15000];

  constructor(private store: Store<AppState>) {}

  ngAfterViewInit() {
    (this.menu as any).closed = this.menu.close = this.configureMenuClose(this.menu.close);
  }


  search(): void {
    if (this.keyword) {
      this.store.dispatch(search({keyword: this.keyword}));
    }
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

  private configureMenuClose(old: MatMenu['close']): MatMenu['close'] {
    const upd = new EventEmitter();
    feed(upd.pipe(
      filter(event => {
        return event !== 'click';
      }),
    ), old);
    return upd;
  }

}

function feed<T>(from: Observable<T>, to: Subject<T>): Subscription {
  return from.subscribe(
    data => to.next(data),
    err => to.error(err),
    () => to.complete(),
  );
}
