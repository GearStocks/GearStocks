/* Angular Modules */
import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { search } from '../../../store/actions/core.actions';
import { Observable, Subject, Subscription } from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

/* Material Angular */
import { MatMenu } from '@angular/material/menu';
import {SearchFormService} from '../../../search-list/services/search-form.service';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('menu') menu!: MatMenu;

  video = 'assets/video/gearstocks.mp4';
  searchForm: FormGroup;
  filters: any;
  subcategories: any;
  models: any;
  range = [0, 15000];
  sliderConfig: any = {
    connect: true,
    step: 50,
    range: {
      min: 0,
      max: 15000
    },
    behaviour: 'drag',
  };

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private searchFormService: SearchFormService) {
    this.searchForm = this.searchFormService.buildForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { filters }) => this.filters = data.filters);
  }

  ngAfterViewInit() {
    (this.menu as any).closed = this.menu.close = this.configureMenuClose(this.menu.close);
  }

  get f() { return this.searchForm.controls; }

  search(): void {
    if (this.f.keyWord.value) {
      this.store.dispatch(search({filters: this.searchForm.getRawValue()}));
    }
  }

  addSelect(value): void {
    if (value && value.subCategory) {
      this.subcategories = value.subCategory;
    } else {
      this.subcategories = null;
    }
  }

  addModel(value): void {
    if (value && value.models) {
      this.models = value.models;
    } else {
      this.models = null;
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
