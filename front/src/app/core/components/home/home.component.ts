/* Angular Modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* RxJs */
import { first } from 'rxjs/operators';

/* Models */
import { User } from '../../../auth/models/user.model';

/* Services */
import { UserService } from '../../../auth/services/user.service';
import { HomeService } from './services/home.service';
import { AlertService } from '../../../shared/components/gearstocks-alert/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})

export class HomeComponent {
  currentUser: User;
  video = 'assets/video/gearstocks.mp4';
  keyword: string;

  constructor(private router: Router, private userService: UserService, private homeService: HomeService,
              private alertService: AlertService) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  search() {
    this.homeService.search(this.keyword)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigateByUrl('/search-list', { state: data });
        },
        () => {}
        );
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
