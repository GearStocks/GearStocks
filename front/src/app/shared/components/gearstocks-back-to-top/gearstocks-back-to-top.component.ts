/* Angular Modules */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-gearstocks-back-to-top',
  templateUrl: './gearstocks-back-to-top.component.html',
  styleUrls: ['./gearstocks-back-to-top.component.scss']
})
export class GearstocksBackToTopComponent implements OnInit, OnDestroy {
  @Input() element: HTMLElement;
  onScroll = false;

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event: any): void => {
    const number = event.srcElement.scrollTop;
    this.onScroll = number > 30;
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
