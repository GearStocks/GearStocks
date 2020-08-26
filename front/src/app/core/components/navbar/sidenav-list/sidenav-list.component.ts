/* Angular Modules */
import { Component, EventEmitter, Output } from '@angular/core';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers';
import {selectAuthState, selectAuthUser} from '../../../../store/reducers/auth.reducer';
import { logout } from '../../../../store/actions/auth.actions';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* Components */
import { SigninComponent } from '../../../../auth/components/signin/signin.component';

/* Models */
import { User } from '../../../../auth/models/user.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();
  isAuthenticated: boolean;
  currentUser: User;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    this.store.pipe(select(selectAuthUser)).subscribe(x => this.currentUser = x);
  }

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }

  logout(): void {
    this.store.dispatch(logout({email: this.currentUser.email}));
    this.onSidenavClose();
  }

  login(): void {
    this.onSidenavClose();
    this.dialog.open(SigninComponent);
  }

}
