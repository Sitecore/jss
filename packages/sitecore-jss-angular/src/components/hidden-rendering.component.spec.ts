import { Component, DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { JssModule } from '../lib.module';

@Component({
  selector: 'test-hidden-rendering',
  template: `
    <sc-hidden-rendering></sc-hidden-rendering>
  `,
})
class TestHiddenRenderingComponent {}

describe('<sc-hidden-rendering />', () => {
  let fixture: ComponentFixture<TestHiddenRenderingComponent>;
  let de: DebugElement;
  let comp: TestHiddenRenderingComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestHiddenRenderingComponent],
        imports: [
          JssModule.withComponents([{ name: 'TestComponent', type: TestHiddenRenderingComponent }]),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHiddenRenderingComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  it('should show section', () => {
    const el = de.nativeElement.getElementsByTagName('sc-hidden-rendering')[0];
    expect(el).toBeDefined();
    expect(el.getAttribute('style')).toEqual(
      'display: block; height: 100px; background-image: linear-gradient(45deg, rgb(255, 255, 255) 25%, rgb(220, 220, 220) 25%, rgb(220, 220, 220) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 75%, rgb(220, 220, 220) 75%, rgb(220, 220, 220) 100%); background-size: 3px 3px;'
    );
  });
});
