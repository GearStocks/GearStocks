/* Angular Modules */
import { Component, EventEmitter, Output } from '@angular/core';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* Models */
import { User } from '../../../../auth/models/user.model';

/* Services */
import { UserService } from '../../../../auth/services/user.service';

/* Componenents */
import { SigninComponent } from '../../../../auth/components/signin/signin.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();
  currentUser: User;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }

  logout(): void {
    this.onSidenavClose();
    this.userService.logout();
  }

  login(): void {
    this.onSidenavClose();
    this.dialog.open(SigninComponent);
  }

}
