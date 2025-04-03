import { Directive, HostBinding } from "@angular/core";

@Directive({
    standalone: true,
    selector: '[click]',
})
export class ClickCursorDirective {
  @HostBinding('style.cursor') cursor = 'pointer';
  constructor() {
  }
}
