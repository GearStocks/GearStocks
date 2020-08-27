/* Angular Modules */
import { Component } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { search } from '../../../store/actions/core.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  video = 'assets/video/gearstocks.mp4';
  keyword: string;

  constructor(private store: Store<AppState>) {}

  search(): void {
    if (this.keyword) {
      this.store.dispatch(search({keyword: this.keyword}));
    }
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
