/* Angular modules */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* RxJs Dependencies */
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {
  updateProfileUrl = environment.updateProfileUrl;

  constructor(private http: HttpClient) {}

  updateProfileData(data: any): Observable<any> {
    return this.http.post<any>(this.updateProfileUrl, data);
  }
}
