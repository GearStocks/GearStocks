/* Angular Modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { selectAuthState } from '../../../../store/reducers/auth.reducer';
import { AppState } from '../../../../store/reducers';

@Component({
  selector: 'app-confirmation',
  templateUrl: './lost-password-confirmation.component.html',
  styleUrls: ['../lost-password.component.scss']
})
export class LostPasswordConfirmationComponent {
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    if (this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }
}
