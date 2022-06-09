import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  currentLanguage: string = '';
  languages: Array<string> = [];

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang;
    this.languages = this.translateService.getLangs();
  }

  onLanguageSelectionChange(event: { value: string}): void {
    this.translateService.use(event.value).subscribe();
  }
}
