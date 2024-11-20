import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { setLanguage } from '../../unsorted/configuration';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      let lang = data['lang'];
      if (lang) {
        setLanguage(lang);
      }
    });
  }
}
