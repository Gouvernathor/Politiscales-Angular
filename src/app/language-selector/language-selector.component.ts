import { Component } from '@angular/core';
import { getLine, languageIds } from '../../services/localizationService';
import { Router } from '@angular/router';
import { ClickCursorDirective } from '../style.directive';

@Component({
  selector: 'app-language-selector',
  imports: [ClickCursorDirective],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
  localize = getLine;
  languageIds = languageIds;

  constructor(private router: Router) {}

  onLanguageChange(lang: string) {
    this.router.navigate([lang]);
  }
}
