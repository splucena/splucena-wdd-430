import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[cmsDropdownDirective]'
})
export class DropdownDirectiveDirective {
  @HostBinding('class.open') isOpen = false;
  constructor() { }

  @HostListener('click') toggleOpen(eventData: Event) {
    this.isOpen = !this.isOpen;
  }

}
