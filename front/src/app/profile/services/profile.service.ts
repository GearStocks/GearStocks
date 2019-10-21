/* Angular modules */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* RxJs Dependencies */
import { Observable } from 'rxjs';

/* Models */
import { User } from '../../auth/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {
  updateProfileUrl = environment.updateProfileUrl;

  constructor(private http: HttpClient) {}

  updateProfileData(user: User): Observable<any> {
    return this.http.post<User>(this.updateProfileUrl, user);
  }
}
