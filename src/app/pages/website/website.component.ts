import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  WebsiteService,
  PublicCompany,
  PublicAnnouncement,
  PublicGalleryImage,
  PublicCoreValue,
} from './website.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss',
})
export class WebsiteComponent implements OnInit, AfterViewInit, OnDestroy {
  env = environment;

  company: PublicCompany | null = null;
  announcements: PublicAnnouncement[] = [];
  gallery: PublicGalleryImage[] = [];
  coreValues: PublicCoreValue[] = [];
  loading = true;

  isMobileMenuOpen = false;
  navScrolled = false;
  lightboxUrl: string | null = null;

  readonly defaultCoreValues: PublicCoreValue[] = [
    { id: '1', title: 'Academic Excellence', body: 'We uphold the highest standards of learning and intellectual growth.', iconName: 'school', displayOrder: 1 },
    { id: '2', title: 'Character &amp; Integrity', body: 'Building young people of honour, honesty, and strong moral fibre.', iconName: 'favorite', displayOrder: 2 },
    { id: '3', title: 'Community &amp; Service', body: 'Nurturing empathy and a spirit of giving back to society.', iconName: 'groups', displayOrder: 3 },
    { id: '4', title: 'Innovation &amp; Creativity', body: 'Encouraging curiosity, innovation, and creative problem-solving.', iconName: 'lightbulb', displayOrder: 4 },
  ];

  // ---- Contact fallbacks ----
  get displayPhone(): string[] {
    if (this.company?.phoneNumber) return [this.company.phoneNumber];
    return this.env.phoneNumbers ?? [];
  }
  get displayEmail(): string {
    return this.company?.email ?? this.env.emails?.[0]?.address ?? '';
  }
  get displayAddress(): string {
    return this.company?.address ?? this.env.address ?? '';
  }
  get displayWhatsApp(): string {
    return this.company?.whatsApp ?? this.displayPhone[0] ?? '';
  }
  get whatsAppLink(): string {
    const num = this.displayWhatsApp.replace(/\D/g, '');
    return `https://wa.me/${num}`;
  }
  get mailtoLink(): string {
    return `mailto:${this.displayEmail}`;
  }

  // ---- Identity fallbacks ----
  get schoolName(): string {
    return this.company?.name ?? this.env.schoolNameFull ?? this.env.schoolName;
  }
  get schoolShort(): string {
    return this.company?.shortName ?? this.env.schoolAbbreviation;
  }
  get logoUrl(): string {
    return this.company?.logo ?? this.env.logoWhiteUrl;
  }
  get yearFounded(): number {
    return this.company?.yearFounded ?? 2004;
  }
  get yearsOfExcellence(): number {
    return new Date().getFullYear() - this.yearFounded;
  }

  // ---- Mission / Vision (HTML content with defaults) ----
  get displayMission(): string {
    return this.company?.mission ||
      `At ${this.schoolName}, our mission is to raise a generation of critical thinkers, compassionate leaders, and responsible global citizens. We believe every child carries extraordinary potential — our role is to ignite it.`;
  }
  get displayVision(): string {
    return this.company?.vision ||
      `To be the leading center of learning excellence — where students don't just pass exams but discover their purpose, develop their character, and are empowered to positively impact their communities and the world beyond.`;
  }
  get safeMission(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.displayMission);
  }
  get safeVision(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.displayVision);
  }
  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html ?? '');
  }

  stripHtml(html: string): string {
    return (html ?? '').replace(/<[^>]*>/g, '').trim();
  }

  // ---- Core values: API data or hardcoded defaults ----
  get displayCoreValues(): PublicCoreValue[] {
    return this.coreValues.length > 0 ? this.coreValues : this.defaultCoreValues;
  }

  // ---- Gallery (all images, carousel handles slicing) ----
  get galleryGrid(): PublicGalleryImage[] {
    return this.gallery;
  }

  // ================================================================
  // NEWS CAROUSEL — infinite sliding, 3 visible, shifts 1 at a time
  // ================================================================
  readonly NEWS_PAGE_SIZE = 3;
  private readonly NEWS_CLONE = 3; // clones on each end

  @ViewChild('newsViewport') newsViewport!: ElementRef<HTMLElement>;
  newsCarouselIndex = 0;
  newsCardWidth = 0;
  newsAnimating = false;
  newsTransitioning = true;

  get newsCarouselActive(): boolean {
    return this.announcements.length > this.NEWS_PAGE_SIZE;
  }

  // Full track: [last 3 clones] [all real items] [first 3 clones]
  get newsAllItems(): PublicAnnouncement[] {
    return [
      ...this.announcements.slice(-this.NEWS_CLONE),
      ...this.announcements,
      ...this.announcements.slice(0, this.NEWS_CLONE),
    ];
  }

  get newsTransform(): string {
    return `translateX(${-this.newsCarouselIndex * this.newsCardWidth}px)`;
  }

  newsNext() {
    if (this.newsAnimating) return;
    this.newsAnimating = true;
    this.newsCarouselIndex++;
  }

  newsPrev() {
    if (this.newsAnimating) return;
    this.newsAnimating = true;
    this.newsCarouselIndex--;
  }

  onNewsTransitionEnd(event: TransitionEvent) {
    if (event.propertyName !== 'transform') return;
    const total = this.announcements.length;
    const C = this.NEWS_CLONE;
    if (this.newsCarouselIndex >= C + total) {
      this.newsTransitioning = false;
      this.newsCarouselIndex = C;
      setTimeout(() => { this.newsTransitioning = true; }, 20);
    } else if (this.newsCarouselIndex < C) {
      this.newsTransitioning = false;
      this.newsCarouselIndex = C + total - 1;
      setTimeout(() => { this.newsTransitioning = true; }, 20);
    }
    this.newsAnimating = false;
  }

  // ====================================================================
  // GALLERY CAROUSEL — infinite sliding, 3 visible, shifts 1 at a time
  // ====================================================================
  readonly GALLERY_PAGE_SIZE = 3;
  private readonly GALLERY_CLONE = 3;

  @ViewChild('galleryViewport') galleryViewport!: ElementRef<HTMLElement>;
  galleryCarouselIndex = 0;
  galleryCardWidth = 0;
  galleryAnimating = false;
  galleryTransitioning = true;

  get galleryCarouselActive(): boolean {
    return this.gallery.length > this.GALLERY_PAGE_SIZE;
  }

  get galleryAllItems(): PublicGalleryImage[] {
    return [
      ...this.gallery.slice(-this.GALLERY_CLONE),
      ...this.gallery,
      ...this.gallery.slice(0, this.GALLERY_CLONE),
    ];
  }

  get galleryTransform(): string {
    return `translateX(${-this.galleryCarouselIndex * this.galleryCardWidth}px)`;
  }

  galleryNext() {
    if (this.galleryAnimating) return;
    this.galleryAnimating = true;
    this.galleryCarouselIndex++;
  }

  galleryPrev() {
    if (this.galleryAnimating) return;
    this.galleryAnimating = true;
    this.galleryCarouselIndex--;
  }

  onGalleryTransitionEnd(event: TransitionEvent) {
    if (event.propertyName !== 'transform') return;
    const total = this.gallery.length;
    const C = this.GALLERY_CLONE;
    if (this.galleryCarouselIndex >= C + total) {
      this.galleryTransitioning = false;
      this.galleryCarouselIndex = C;
      setTimeout(() => { this.galleryTransitioning = true; }, 20);
    } else if (this.galleryCarouselIndex < C) {
      this.galleryTransitioning = false;
      this.galleryCarouselIndex = C + total - 1;
      setTimeout(() => { this.galleryTransitioning = true; }, 20);
    }
    this.galleryAnimating = false;
  }

  // ---- Shared carousel setup ----
  private companyId = '';

  constructor(
    private route: ActivatedRoute,
    private websiteService: WebsiteService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.companyId =
      this.route.snapshot.params['companyId'] || this.env.companyId || '';

    if (this.companyId) {
      forkJoin({
        company: this.websiteService.getCompany(this.companyId).pipe(catchError(() => of(null))),
        announcements: this.websiteService.getAnnouncements(this.companyId).pipe(catchError(() => of([]))),
        gallery: this.websiteService.getGallery(this.companyId).pipe(catchError(() => of([]))),
        coreValues: this.websiteService.getCoreValues(this.companyId).pipe(catchError(() => of([]))),
      }).subscribe(({ company, announcements, gallery, coreValues }) => {
        this.company = company;
        this.announcements = announcements;
        this.gallery = gallery;
        this.coreValues = coreValues;
        this.loading = false;
        setTimeout(() => this.initCarousels(), 0);
      });
    } else {
      this.loading = false;
    }
  }

  ngAfterViewInit() {
    this.computeCardWidths();
  }

  private initCarousels() {
    this.computeCardWidths();
    if (this.newsCarouselActive) {
      this.newsCarouselIndex = this.NEWS_CLONE;
    }
    if (this.galleryCarouselActive) {
      this.galleryCarouselIndex = this.GALLERY_CLONE;
    }
  }

  private computeCardWidths() {
    const cols = window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    if (this.newsViewport?.nativeElement) {
      this.newsCardWidth = this.newsViewport.nativeElement.offsetWidth / cols;
    }
    if (this.galleryViewport?.nativeElement) {
      this.galleryCardWidth = this.galleryViewport.nativeElement.offsetWidth / cols;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.navScrolled = window.scrollY > 60;
  }

  @HostListener('window:resize')
  onResize() {
    this.newsTransitioning = false;
    this.galleryTransitioning = false;
    this.computeCardWidths();
    setTimeout(() => {
      this.newsTransitioning = true;
      this.galleryTransitioning = true;
    }, 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  smoothScroll(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollAndClose(id: string) {
    this.smoothScroll(id);
    this.isMobileMenuOpen = false;
  }

  openLightbox(url: string) {
    this.lightboxUrl = url;
  }

  closeLightbox() {
    this.lightboxUrl = null;
  }

  categoryIcon(category?: string): string {
    const map: Record<string, string> = {
      graduation: 'school',
      cultural: 'diversity_2',
      christmas: 'music_note',
      sports: 'sports_soccer',
      academic: 'menu_book',
      event: 'event',
      science: 'science',
      award: 'emoji_events',
      meeting: 'groups',
      holiday: 'celebration',
    };
    const key = (category ?? '').toLowerCase();
    return Object.entries(map).find(([k]) => key.includes(k))?.[1] ?? 'campaign';
  }

  ngOnDestroy() {}
}
