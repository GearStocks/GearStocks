/* Angular Modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* Models */
import { User } from '../../../auth/models/user.model';

/* Services */
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  currentUser: User;
  video = 'assets/video/gearstocks.mp4';
  keyword: string;

  constructor(private router: Router, private userService: UserService) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  search() {
    /* provisoir pour démo */
    if (this.keyword.match('pneu')) {
      this.router.navigateByUrl('/item');
    } else if (this.keyword.match('bougie')) {
      this.router.navigateByUrl('/item2');
         }

  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
