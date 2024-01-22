import React from 'react';
import { expect } from 'chai';
import { ComponentBuilder } from './ComponentBuilder';

describe('ComponentBuilder', () => {
  describe('getComponentFactory', () => {
    it('should provide component', () => {
      const Foo = { default: () => <div>Foo</div> };
      const Bar = { default: () => <div>Bar</div> };
      const Text = { Default: () => <div>Text</div> };
      const components = new Map();
      components.set('Foo', Foo);
      components.set('Bar', Bar);
      components.set('Text', Text);

      const builder = new ComponentBuilder({ components });
      const componentFactory = builder.getComponentFactory({});

      expect(componentFactory('Foo')).to.equal(Foo.default);
      expect(componentFactory('Bar')).to.equal(Bar.default);
      expect(componentFactory('Text')).to.equal(Text.Default);
      expect(componentFactory('Unknown')).to.equal(null);
    });

    it('should provide lazy component', () => {
      const fooComponent = () => <div>Foo</div>;
      const Foo = { element: () => fooComponent };
      const Bar = { default: () => <div>Bar</div> };
      const components = new Map();
      components.set('Foo', Foo);
      components.set('Bar', Bar);

      const builder = new ComponentBuilder({ components });
      const componentFactory = builder.getComponentFactory({});

      expect(componentFactory('Foo')).to.equal(fooComponent);
      expect(componentFactory('Bar')).to.equal(Bar.default);
    });

    it('should provide lazy component in editing mode', () => {
      const fooComponent = () => <div>Foo</div>;
      const Foo = { element: (isEditing: boolean) => (isEditing ? fooComponent : null) };
      const Bar = { default: () => <div>Bar</div> };
      const components = new Map();
      components.set('Foo', Foo);
      components.set('Bar', Bar);

      const builder = new ComponentBuilder({ components });
      const componentFactory = builder.getComponentFactory({ isEditing: true });

      expect(componentFactory('Foo')).to.equal(fooComponent);
      expect(componentFactory('Bar')).to.equal(Bar.default);
    });

    it('should provide component using custom export name', () => {
      const Foo = { default: () => <div>Foo</div>, text: () => <div>Text</div> };
      const components = new Map();
      components.set('Foo', Foo);

      const builder = new ComponentBuilder({ components });
      const componentFactory = builder.getComponentFactory({});

      expect(componentFactory('Foo')).to.equal(Foo.default);
      expect(componentFactory('Foo', 'text')).to.equal(Foo.text);
    });
  });

  describe('getModuleFactory', () => {
    it('should provide module', () => {
      const Foo = { default: () => <div>Foo</div> };
      const Bar = { default: () => <div>Bar</div> };
      const components = new Map();
      components.set('Foo', Foo);
      components.set('Bar', Bar);

      const builder = new ComponentBuilder({ components });
      const moduleFactory = builder.getModuleFactory();

      expect(moduleFactory('Foo')).to.equal(Foo);
      expect(moduleFactory('Bar')).to.equal(Bar);
      expect(moduleFactory('Unknown')).to.equal(null);
    });

    it('should provide lazy module', () => {
      const fooModule = { default: () => <div>Foo</div> };
      const Foo = { module: () => fooModule };
      const Bar = { default: () => <div>Bar</div> };

      const components = new Map();
      components.set('Foo', Foo);
      components.set('Bar', Bar);

      const builder = new ComponentBuilder({ components });
      const moduleFactory = builder.getModuleFactory();

      expect(moduleFactory('Foo')).to.equal(fooModule);
      expect(moduleFactory('Bar')).to.equal(Bar);
      expect(moduleFactory('Unknown')).to.equal(null);
    });
  });
});
