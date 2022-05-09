import { Directive, Input, TemplateRef, ViewContainerRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[replaceTag]'
})
export class ReplaceTagDirective implements AfterViewChecked {
  constructor(
    private templateRef: TemplateRef<any>,
    private vcf: ViewContainerRef
  ) { }
  private _tag: string;
  private _needUpdate: boolean = false;

  @Input('replaceTag')
  
  set tag(t: string) {
    this._tag = t;
    this._needUpdate = true;
    this.vcf.clear();
    let template = this.templateRef.elementRef.nativeElement.nextElementSibling;
    if (template) {
      this.templateRef.elementRef.nativeElement.parentNode.removeChild(template);
    }
    this.vcf.createEmbeddedView(this.templateRef);
  }

  ngAfterViewChecked() {
    if (this._needUpdate) {
      this._updateTemplate();
      this._needUpdate = false;
    }
  }

  private _updateTemplate() {
    let template = this.templateRef.elementRef.nativeElement.nextElementSibling;
    if (template) {
      let r = document.createElement(this._tag);
      r.className = template.className;
      r.innerHTML = template.innerHTML;
      this.templateRef.elementRef.nativeElement.parentNode.replaceChild(r, template);
    }
  }
}