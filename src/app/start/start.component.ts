import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { setLanguage } from '../../unsorted/configuration';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.activatedRoute.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }
  }
}
