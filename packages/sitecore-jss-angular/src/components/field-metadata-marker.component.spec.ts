import { Component, DebugElement, Input } from '@angular/core';
import { FieldMetadataMarkerComponent } from './field-metadata-marker.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-marker',
  template: `
    <code scFieldMetadataMarker [metadata]="metadata" [kind]="kind"></code>
  `,
})
class TestComponent {
  @Input() metadata: any;
  @Input() kind: 'open' | 'close' = 'open';
}

describe('<code scFieldMetadataMarker />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldMetadataMarkerComponent, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement;
    comp = fixture.componentInstance;
  });

  it('should render code element with metadata', () => {
    const rendered = de.query(By.css('code')).nativeElement;
    expect(rendered).not.toBeNull();
    expect(rendered.getAttribute('type')).toBe('text/sitecore');
    expect(rendered.getAttribute('chrometype')).toBe('field');
  });

  it('should render a kind attribute with "open" value', () => {
    comp.kind = 'open';
    fixture.detectChanges();

    const rendered = de.query(By.css('code')).nativeElement;
    expect(rendered.getAttribute('kind')).toBe('open');
  });

  it('should render a kind attribute with "close" value', () => {
    comp.kind = 'close';
    fixture.detectChanges();

    const rendered = de.query(By.css('code')).nativeElement;
    expect(rendered.getAttribute('kind')).toBe('close');
  });

  it('should add metadata as content of code element', () => {
    comp.metadata = { key: 'value' };
    fixture.detectChanges();

    const rendered = de.query(By.css('code')).nativeElement as HTMLElement;
    expect(rendered.textContent).toBe(JSON.stringify(comp.metadata));
  });
});
