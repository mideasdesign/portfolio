import { Component, signal, computed } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  currentIndex = signal(0);

  constructor(private translate: TranslateService) {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  // Get testimonials from translation
  getTestimonials() {
    const translations = this.translate.instant('testimonials.entries');
    return Array.isArray(translations) ? translations : [];
  }

  // Touch/Swipe Events
  startX = 0;
  currentX = 0;
  isDragging = false;

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.currentX = event.touches[0].clientX;
  }

  onTouchEnd() {
    if (!this.isDragging) return;
    
    const diffX = this.startX - this.currentX;
    const threshold = 50; // Minimum swipe distance in pixels
    
    if (Math.abs(diffX) > threshold) {
      this.handleSwipe(diffX);
    }
    
    this.isDragging = false;
  }

  private handleSwipe(diffX: number) {
    if (diffX > 0) {
      // Swipe left - next testimonial
      this.nextTestimonial();
    } else {
      // Swipe right - previous testimonial
      this.previousTestimonial();
    }
  }

  nextTestimonial() {
    const maxIndex = this.getTestimonials().length - 1;
    if (this.currentIndex() < maxIndex) {
      this.currentIndex.update(index => index + 1);
    }
  }

  previousTestimonial() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(index => index - 1);
    }
  }

  goToTestimonial(index: number) {
    this.currentIndex.set(index);
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
