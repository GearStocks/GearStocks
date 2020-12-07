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

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, AfterViewInit {
  @ViewChild('menu') menu!: MatMenu;

  data: Items;
  searchForm: FormGroup;
  categories: any;
  range = [0, 15000];
  sliderConfig: any = {
    connect: true,
    step: 100,
    range: {
      min: 0,
      max: 15000
    },
    behaviour: 'drag',
  };

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private searchFormService: SearchFormService) {
    this.store.pipe(select(selectSearchList)).subscribe(x => this.data = x);
    this.searchForm = this.searchFormService.buildForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { categories }) => this.categories = data.categories.categories);
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
