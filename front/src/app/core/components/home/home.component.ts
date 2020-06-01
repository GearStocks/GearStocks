/* Angular Modules */
import { Component } from '@angular/core';

/* Services */
import { SearchService } from '../../../search-list/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SearchService]
})

export class HomeComponent {
  video = 'assets/video/gearstocks.mp4';
  keyword: string;

  constructor(private searchService: SearchService) {}

  search(): void {
    this.searchService.search(this.keyword);
      /*.pipe(first())
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/search-list', { state: data });
        },
        () => {}
        );
        */
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
