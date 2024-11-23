import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[axisLabelVisibility]',
  standalone: true
})
export class VisibilityDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngAfterContentChecked() {
    const span = this.element.nativeElement;
    const axis = span.closest(".axisSubProgress");
    this.renderer.setStyle(span, "visibility",
      span.offsetWidth > axis.offsetWidth ? "hidden" : "visible",
    )
  }
}
