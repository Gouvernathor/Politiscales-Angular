import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getLine } from '../unsorted/configuration';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'politiscales';
  localize = getLine;
  pageLayout?: string;
}
