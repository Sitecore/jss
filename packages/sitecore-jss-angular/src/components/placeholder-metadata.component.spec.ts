import { Component, ContentChild, DebugElement, Input, OnChanges } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { PlaceholderMetadataComponent } from './placeholder-metadata.component';

type MetadataProps = {
  enabled: boolean;
  rendering: ComponentRendering;
  placeholderName?: string;
};

@Component({
  selector: 'test-home',
  template: `
    <sc-placeholder-metadata #metadata>
      <div class="richtext-mock"></div>
    </sc-placeholder-metadata>
  `,
})
class TestComponent implements OnChanges {
  @ContentChild(PlaceholderMetadataComponent, { static: true })
  metadata: PlaceholderMetadataComponent;

  @Input() metadataProps: MetadataProps;
  ngOnChanges(): void {
    this.metadata.enabled = this.metadataProps.enabled;
    this.metadata.rendering = this.metadataProps.rendering;
    this.metadata.placeholderName = this.metadataProps.placeholderName;
  }
}

describe('<sc-placeholder-metadata>', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(
    'renders rendering code blocks for metadataType rendering',
    waitForAsync(async () => {
      const rendering = { uid: '123', componentName: 'RichText' };
      comp.metadataProps = {
        rendering,
        enabled: true,
      };
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      const testComponent = de.query(By.directive(TestComponent));
      expect(testComponent.nativeElement.innerHTML).toEqual(
        [
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code>',
          '<div class="richtext-mock"></div>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
        ].join('')
      );
    })
  );
  /*

  it(
    'renders placeholder code blocks when metadataType is placeholder',
    waitForAsync(async () => {})
  );

  it(
    'renders placeholder code blocks with DEFAULT_PLACEHOLDER_UID value when metadataType is a placeholder(root) and uid is not present',
    waitForAsync(async () => {})
  );

  it(
    'renders placeholder blocks with rendering uid when metadataType is dynamic placeholder',
    waitForAsync(async () => {})
  );

  it(
    'renders placeholder blocks with DEFAULT_PLACEHOLDER_UID value when metadataType is dynamic placeholder and uid is not present',
    waitForAsync(async () => {})
  );

  it(
    'renders placeholder code blocks when metadataType is double digit dynamic placeholder',
    waitForAsync(async () => {})
  );
  */
});
