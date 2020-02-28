/* Angular Modules */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }
}
