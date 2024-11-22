import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { getLine, setLanguage } from '../../services/localizationService';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  localize = getLine;
  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.route.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }
  }
}
