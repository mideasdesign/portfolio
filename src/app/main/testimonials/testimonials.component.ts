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

  // Testimonials aus der Translation holen
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
    const threshold = 50; // Mindest-Swipe-Distanz in Pixeln
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe nach links - nächstes Testimonial
        this.nextTestimonial();
      } else {
        // Swipe nach rechts - vorheriges Testimonial
        this.previousTestimonial();
      }
    }
    
    this.isDragging = false;
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
