import { Injectable, HostListener } from '@angular/core';
import { CommonCssClass } from '../magic-string/common.model';

@Injectable()
export class ScrollService {

  private scrollLeft: number;
  constructor() { }
  getScrollbarWidth(): number {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';
    // add innerdiv
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    // remove divs
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
  }

  onScroll(event: Event) {
    this.scrollLeft = (event.target as HTMLElement).scrollLeft;
    document.getElementById('data-table-header').style.left = -Math.abs(this.scrollLeft) + 'px';
    /* function to get width of scroll bar */
    this.getScrollbarWidth();
    /* function to get width of scroll bar */
    /* manage scroll bar */
    this.dataProperalignment();
  }

  dataProperalignment() {
    /* condition to get data in proper alignment */
    if (document.getElementById('data-table-body')) {
      if (document.getElementById('data-table-body').scrollHeight > document.getElementById('data-table-body').clientHeight === true) {
        document.getElementById('data-table-header').style.marginRight = +this.getScrollbarWidth() + 'px';
      } else {
        document.getElementById('data-table-header').style.marginRight = '0';
      }
    }
  }

  @HostListener("window:scroll", [])
  public onWindowScroll(): void {
    var parentElement = document.getElementsByClassName(CommonCssClass.ToggleDropdownMenu);
    Array.prototype.forEach.call(parentElement, function (el) {
      el.classList.remove(CommonCssClass.ShowClassName);
    });
  }

}
