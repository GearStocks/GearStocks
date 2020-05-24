/* Angular modules */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/* RxJs */
import { first } from 'rxjs/operators';

/* Services */
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {
  data = null;
  keyword: string;
  onScroll = false;

  constructor(private location: Location, private searchService: SearchService) {}

  ngOnInit() {
    this.data = this.location.getState();
    console.log(this.data);
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event: any): void => {
    const number = event.srcElement.scrollTop;
    this.onScroll = number > 30;
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

  search() {
    this.searchService.search(this.keyword)
      .pipe(first())
      .subscribe(
        (data) => {
          this.data = data;
        },
        () => {}
      );
  }

  getUnits(): number {
    if (this.data.items) {
      return this.data.items.length;
    } else {
      return 0;
    }
  }

}
