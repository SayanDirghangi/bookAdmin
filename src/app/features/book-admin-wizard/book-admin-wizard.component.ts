import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-admin-wizard',
  templateUrl: './book-admin-wizard.component.html',
  styleUrls: ['./book-admin-wizard.component.scss']
})
export class BookAdminWizardComponent implements OnInit, OnDestroy {
  heroImages: string[] = ['assets/images/homebg1.png', 'assets/images/homebg2.jpg'];
  currentSlideIndex = 0;
  isHeroAnimating = false;
  private slideTimerId: number | null = null;

  ngOnInit(): void {
    this.playHeroAnimation();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  nextSlide(): void {
    this.moveToSlide(this.currentSlideIndex + 1);
    this.restartAutoSlide();
  }

  previousSlide(): void {
    this.moveToSlide(this.currentSlideIndex - 1);
    this.restartAutoSlide();
  }

  goToSlide(index: number): void {
    this.moveToSlide(index);
    this.restartAutoSlide();
  }

  private moveToSlide(index: number): void {
    const totalSlides = this.heroImages.length;
    this.currentSlideIndex = (index + totalSlides) % totalSlides;
    this.playHeroAnimation();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.slideTimerId = window.setInterval(() => {
      this.moveToSlide(this.currentSlideIndex + 1);
    }, 4000);
  }

  private stopAutoSlide(): void {
    if (this.slideTimerId !== null) {
      window.clearInterval(this.slideTimerId);
      this.slideTimerId = null;
    }
  }

  private restartAutoSlide(): void {
    this.startAutoSlide();
  }

  private playHeroAnimation(): void {
    this.isHeroAnimating = false;
    window.requestAnimationFrame(() => {
      this.isHeroAnimating = true;
    });
  }

}
