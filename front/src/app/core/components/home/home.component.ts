/* Angular Modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* RxJs */
import { first } from 'rxjs/operators';

/* Models */
import { User } from '../../../auth/models/user.model';

/* Services */
import { UserService } from '../../../auth/services/user.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SearchService]
})

export class HomeComponent {
  currentUser: User;
  video = 'assets/video/gearstocks.mp4';
  keyword: string;

  constructor(private router: Router, private userService: UserService, private searchService: SearchService) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  search() {
    this.searchService.search(this.keyword)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/search-list', { state: data });
        },
        () => {}
        );
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
