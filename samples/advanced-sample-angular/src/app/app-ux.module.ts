import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatTabsModule,
  MatProgressBarModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { environment as env } from '../environments/environment';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboard: true,
  pagination: true,
  navigation: true,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
  },
  speed: 750,
};

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    SwiperModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports: [
    SwiperModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ]
})
export class AppUxModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(`${env.scApiHost}${env.deployUrl}/assets/mdi.svg`));
  }
}
