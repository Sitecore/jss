import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { By } from '@angular/platform-browser';

const testData = {
  componentName: 'Welcome',
  fields: {
    title: {
      value: 'Sitecore Experience Platform + JSS + Angular',
    },
    text: {
      value: '<p>Some text</p>',
    },
    logoImage: {
      value: {
        src: '/assets/img/banner.jpg',
        alt: 'Logo'
      },
    },
  }
};

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [
        // No need for .withComponents here, only needed for sc-placeholder component.
        JssModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    component.rendering = testData;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render content title as text from title field', () => {
    const titleDe = fixture.debugElement.query(By.css('.contentTitle'));
    expect(titleDe.nativeElement.innerText).toBe(testData.fields.title.value);
  });

  it('should render content description as rich text from text field', () => {
    const titleDe = fixture.debugElement.query(By.css('.contentDescription'));
    expect(titleDe.nativeElement.innerHTML).toBe(testData.fields.text.value);
  });

  it('should render logo as image from logoImage field', () => {
    const titleDe = fixture.debugElement.query(By.css('#Header img'));
    expect(titleDe.nativeElement.src).toContain(testData.fields.logoImage.value.src);
    expect(titleDe.nativeElement.alt).toContain(testData.fields.logoImage.value.alt);
  });
});
