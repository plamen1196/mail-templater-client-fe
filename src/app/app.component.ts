import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {EmailConfirmationService} from "../services/email-confirmation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mail-templater-client-fe';

  constructor(private translateService: TranslateService,
              private emailConfirmationService: EmailConfirmationService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');

    // add langs
    this.translateService.addLangs(['bg']);
    this.translateService.addLangs(['es']);
    this.translateService.addLangs(['de']);
    this.translateService.addLangs(['fr']);
    this.translateService.addLangs(['it']);
  }

  ngOnInit(): void {
    /* Fetching the reply message max length once and preserving the result. */
    this.emailConfirmationService.getReplyMessageMaxLength().subscribe();
  }
}
