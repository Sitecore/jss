import React, { ComponentType } from 'react';
import { expect } from 'chai';
import { ComponentBuilder } from './ComponentBuilder';

describe('ComponentBuilder', () => {
  it('should create component factory and provide component', () => {
    const Foo = () => <div>Foo</div>;
    const Bar = () => <div>Bar</div>;
    const components = new Map<string, ComponentType>();
    components.set('Foo', Foo);
    components.set('Bar', Bar);

    const builder = new ComponentBuilder({ components });
    const componentFactory = builder.getComponentFactory();

    expect(componentFactory('Foo')).to.equal(Foo);
    expect(componentFactory('Bar')).to.equal(Bar);
    expect(componentFactory('Unknown')).to.equal(null);
  });
});
