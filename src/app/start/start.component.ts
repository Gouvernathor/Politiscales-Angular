import { firstValueFrom } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getLine, setLanguage } from '../../services/localizationService';

@Component({
  selector: 'app-start',
  imports: [RouterLink],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  private readonly route = inject(ActivatedRoute);

  localize = getLine;

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.route.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }
  }
}
