import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTemplaterApi } from 'src/api/email-templater-api';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationService {

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
}
