import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getLine, languageIds } from '../../services/localizationService';

@Component({
  selector: 'app-language-selector',
  imports: [RouterLink],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
  localize = getLine;
  languageIds = languageIds;
}
