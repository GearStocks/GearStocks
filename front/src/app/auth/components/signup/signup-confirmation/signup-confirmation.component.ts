/* Angular Modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { selectAuthState } from '../../../../store/reducers/auth.reducer';
import { AppState } from '../../../../store/reducers';

@Component({
  selector: 'app-confirmation',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.scss']
})
export class SignupConfirmationComponent {
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    if (this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }
}
