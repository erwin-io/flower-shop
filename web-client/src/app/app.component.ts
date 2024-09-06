import { Component, HostListener, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-client';
  lastScrollTop = 0;
  showScrollToTop = false;
  constructor(private renderer: Renderer2) {}

  // Detect scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > this.lastScrollTop) {
      // Scrolling down
      this.showScrollToTop = false;
    } else {
      // Scrolling up
      if (scrollPosition > 200) {
        this.showScrollToTop = true;
      } else {
        this.showScrollToTop = false;
      }
    }
    
    this.lastScrollTop = scrollPosition;
  }
  // Scroll to the top
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
