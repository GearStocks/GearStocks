/* Angular Modules */
import { Component, EventEmitter, Output } from '@angular/core';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { selectAuthState, selectAuthUser } from '../../../store/reducers/auth.reducer';
import { logout } from '../../../store/actions/auth.actions';

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
  isAuthenticated: boolean;
  currentUser: User;

  constructor(private store: Store<AppState>, public userService: UserService, public dialog: MatDialog) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    this.store.pipe(select(selectAuthUser)).subscribe(x => this.currentUser = x);
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  open(): void {
    this.dialog.open(SigninComponent);
  }

  logout(): void {
    this.store.dispatch(logout({email: this.currentUser.email}));
  }

}
