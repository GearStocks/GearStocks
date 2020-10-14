/* Angular modules */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { selectSearchList } from '../store/reducers/core.reducer';
import { getItem, search } from '../store/actions/core.actions';

/* Models */
import { Item, Items } from './models/items.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  data: Items;
  keyword: string;
  categories: any;
  selectedCategorie: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.store.pipe(select(selectSearchList)).subscribe(x => this.data = x);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { categories }) => this.categories = data.categories.categories);
  }

  search(): void {
    if (this.keyword) {
      this.store.dispatch(search({keyword: this.keyword}));
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

}
