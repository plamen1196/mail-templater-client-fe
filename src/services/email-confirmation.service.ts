import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { EmailTemplaterApi } from 'src/api/email-templater-api';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationService {

  readonly replyMessageMaxLength$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) { }

  confirmEmail(
    recipientEmail: string,
    recipientToken: string,
    recipientConfirmation: number): Observable<any> {
      let params = new HttpParams()
      params = params.append('recipientEmail', recipientEmail);
      params = params.append('recipientToken', recipientToken);
      params = params.append('recipientConfirmation', recipientConfirmation);

      return this.httpClient.patch<any>(EmailTemplaterApi.CONFIRM_EMAIL, null, { params });
  }

  getReplyMessageMaxLength(): Observable<number> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.get<number>(EmailTemplaterApi.REPLY_MESSAGE_MAX_LENGTH, { headers })
      .pipe(tap(value => this.replyMessageMaxLength$.next(value)));
  }
}
