import { Component } from '@angular/core';
import { getLine, languageIds } from '../../unsorted/configuration';

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
}
