/* Angular modules */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

/* RxJs */
import { first } from 'rxjs/operators';

/* Services */
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {
  data = null;
  keyword: string;
  onScroll = false;

  constructor(private location: Location, private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.data = this.location.getState();
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

  search(): void {
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
    if (this.data.parts) {
      return this.data.parts.length;
    } else {
      return 0;
    }
  }

  navigate(item: any): void {
    this.searchService.getItem(item.name)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/item', { state: data.data });
        },
        () => {}
      );

  }

}
