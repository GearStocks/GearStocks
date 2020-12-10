/* Angular modules */
import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { selectSearchList } from '../store/reducers/core.reducer';
import {getItem, search, searchByCategory} from '../store/actions/core.actions';

/* Models */
import { Item, Items } from './models/items.model';
import {FormGroup} from '@angular/forms';
import {MatMenu} from '@angular/material/menu';
import {SearchFormService} from './services/search-form.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {selectAuthState, selectAuthUser} from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, AfterViewInit {
  @ViewChild('menu') menu!: MatMenu;

  data: Items;
  searchForm: FormGroup;
  filters: any;
  subcategories: any;
  models: any;
  bookmarks: any;
  isAuthenticated: boolean;
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
    this.store.pipe(select(selectSearchList)).subscribe(x => this.data = x);
    this.store.pipe(select(selectAuthUser)).subscribe(x => this.bookmarks = x.bookmarks);
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    this.searchForm = this.searchFormService.buildForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { filters }) => this.filters = data.filters);
  }

  ngAfterViewInit() {
    (this.menu as any).closed = this.menu.close = this.configureMenuClose(this.menu.close);
  }

  get f() { return this.searchForm.controls; }

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

  search(): void {
    if (this.f.keyWord.value) {
      this.store.dispatch(search({filters: this.searchForm.getRawValue()}));
    }
  }

  getUnits(): number {
    if (this.data && this.data.parts) {
      return this.data.parts.length;
    } else {
      return 0;
    }
  }

  navigate(item: Item): void {
    this.store.dispatch(getItem({name: item.name}));
  }

  navigateToBookmark(value): void {
    this.store.dispatch(getItem({name: value}));
  }

  price(nb): number {
    return parseInt(nb, 10);
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
