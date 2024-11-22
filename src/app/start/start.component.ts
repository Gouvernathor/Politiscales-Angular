import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getLine, setLanguage } from '../../services/localizationService';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  localize = getLine;
  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.route.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }
  }

  onStartQuiz() {
    this.router.navigate(['quiz'], {relativeTo: this.route});
  }
}
