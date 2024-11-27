import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { getLanguageOrDefault, getLine, languageIds } from '../services/localizationService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'politiscales';
  localize = getLine;

  constructor(private router: Router) {}

  getLang() {
    return getLanguageOrDefault().replace('_', '-');
  }

  gotoHelp() {
    // if in a language page, go to /xx_XX/help
    // if not, go to /help
    const [[, firstSegment],] = this.router.url.matchAll(/^\/*([^/]*)/g);
    const target = [];
    if (languageIds.includes(firstSegment)) {
      target.push(firstSegment);
    }
    target.push('help');
    this.router.navigate(target);
  }

  gotoLangSelect() {
    this.router.navigate(['']);
  }

  gotoStart() {
    // go to /xx_XX
    this.router.navigate([getLanguageOrDefault()]);
  }
}
