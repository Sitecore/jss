import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface MetaSettings {
  title?: string;
}

@Injectable()
export class JssMetaService {
  protected titleService = inject(Title);
  protected meta = inject(Meta);

  setTitle(title?: string) {
    this.titleService.setTitle(title);
  }

  setTag(name: string, value: string) {
    this.meta.addTag({ name, content: value });
  }

  update(meta: MetaSettings) {
    this.setTitle(meta.title);
  }
}
