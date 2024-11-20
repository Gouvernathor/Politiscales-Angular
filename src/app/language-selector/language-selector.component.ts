import { Component } from '@angular/core';
import { getLine, languageIds } from '../../unsorted/configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
  localize = getLine;
  languageIds = languageIds;

  constructor(private router: Router) {}

  onLanguageChange(lang: string) {
    this.router.navigate([lang, '']);
  }
}
