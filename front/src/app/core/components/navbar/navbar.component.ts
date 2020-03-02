/* Angular Modules */
import { Component, EventEmitter, Output } from '@angular/core';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* Services */
import { UserService } from '../../../auth/services/user.service';

/* Components */
import { SigninComponent } from '../../../auth/components/signin/signin.component';

/* Models */
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  @Output() public sidenavToggle = new EventEmitter();
  currentUser: User;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  open(): void {
    this.dialog.open(SigninComponent);
  }
}
