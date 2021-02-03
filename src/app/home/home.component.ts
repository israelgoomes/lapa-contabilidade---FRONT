import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isMobile: boolean = false;
  classMenu = "menu";
  breakpoint = 3;
  breakpoint2 = 2;
  rowHeight = "3:2"
  rowHeight2 = "2:1"
  listener;

  constructor(private renderer2: Renderer2) {
    this.listener = this.renderer2.listen('window', 'scroll', (e) => {
      let scrollTopPosition = e.path[0].scrollingElement.scrollTop

      if (scrollTopPosition >= 125) {
        this.classMenu = "scroll"
      } else {
        this.classMenu = "menu"
      }

      // console.log(e.path[0].scrollingElement.scrollTop)
      //console.log('Position', this.getYPosition(e));
    });
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    this.listener();
  }

  ngOnInit(): void {
    this.detectar_mobile();
  }

  onResize(e) {
    this.breakpoint = (e.target.innerWidth <= 1600 && e.target.innerWidth >= 1000) ? 2 : (e.target.innerWidth <= 1000) ? 1 : 3;
    this.rowHeight = (e.target.innerWidth <= 1600 && e.target.innerWidth >= 1000) ? "2:1" : (e.target.innerWidth <= 1000) ? "3:4" : "3:2";
    //console.log('altura', this.rowHeight)
  }

  onResize2(e) {
    this.breakpoint2 = (e.target.innerWidth <= 800) ? 1 : 2;
    this.rowHeight2 = (e.target.innerWidth <= 1600 && e.target.innerWidth >= 900) ? "3:2" : (e.target.innerWidth >= 1800) ? "2:1" : (e.target.innerWidth <= 900) ? "3:3" : "2:1";
    console.log('altura 2', this.rowHeight2)
  }

  getScrollingElement(): Element {
    return document.scrollingElement || document.documentElement;
  }

  detectar_mobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false;
    }
  }

}
