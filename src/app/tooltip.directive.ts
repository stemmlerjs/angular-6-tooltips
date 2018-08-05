import { 
  Directive, ElementRef, ViewContainerRef, Input, HostListener, Renderer2 
} from "@angular/core";

@Directive({
  selector: "[tooltip]"
})

export class TooltipDirective {
  @Input("text") content: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.addClass(el.nativeElement, 'app-tooltip');
  }

  /** 
   * setActive
   * 
   * @param {Event} event
   * @desc On click, the clicked tooltip is activated.
   */

  @HostListener("click", ["$event"])
  setActive(event) {
    this.renderer.addClass(this.el.nativeElement, 'app-tooltip-active')
  }
  
  /** 
   * detectClickOutside
   * 
   * @param {Event} event
   * @desc If clicked outside of, the tooltip is deactivated.
   */

  @HostListener('document:click', ['$event'])
  detectClickOutside(event) {
    if(!this.el.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.el.nativeElement, 'app-tooltip-active')
    } 
  }

  /** 
   * detectEscapeKeyPressed
   * 
   * @param {Event} event
   * @desc If the ESC key is pressed, we'll deactivate the tooltip.
   */

  @HostListener("document:keydown", ["$event"])
  detectEscapeKeyPressed(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.renderer.removeClass(this.el.nativeElement, 'app-tooltip-active')
    }
  }
}
