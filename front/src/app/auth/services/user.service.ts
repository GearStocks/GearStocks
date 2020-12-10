/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* RxJs Dependencies */
import { Observable } from 'rxjs';

/* Models */
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

/* Environment */
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  public loginUrl = environment.loginUrl;
  public logoutUrl = environment.logoutUrl;
  public registerUrl = environment.registerUrl;
  public resetPasswordUrl = environment.resetPasswordUrl;
  public updateProfileUrl = environment.updateProfileUrl;

  constructor(private http: HttpClient) {}

  login(authData: AuthData): Observable<User> {
    return this.http.post<User>(this.loginUrl, authData, httpOptions);
  }

  logout(email: string): Observable<any> {
    return this.http.post<any>(this.logoutUrl, { email: email }, httpOptions);
  }

  register(authData: User): Observable<any> {
    return this.http.post<any>(this.registerUrl, authData, httpOptions);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl, { email: email }, httpOptions);
  }

  updateUser(data: User): Observable<User> {
    return this.http.post<User>(this.updateProfileUrl, data, httpOptions);
  }
}
