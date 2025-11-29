import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { getLanguageOrDefault, getLine, languageIds } from '../services/localizationService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'politiscales';
  localize = getLine;

  private readonly router = inject(Router);

  getLang() {
    return getLanguageOrDefault().replace('_', '-');
  }

  helpCommands() {
    // if in a language page, go to /xx_XX/help
    // if not, go to /help
    const [[, firstSegment],] = this.router.url.matchAll(/^\/*([^/]*)/g);
    const target = [];
    if (languageIds.includes(firstSegment)) {
      target.push(firstSegment);
    }
    target.push('help');
    return target;
  }

  langSelectCommands() {
    return [ '' ];
  }

  startCommands() {
    // go to /xx_XX
    return [ getLanguageOrDefault() ];
  }
}
