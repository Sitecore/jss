/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { spy } from 'sinon';
import { ComponentFactoryCreator } from './ComponentFactoryCreator';

describe('ComponentFactoryCreator', () => {
  const components = new Map();
  components.set('text', 'textcomponent');
  components.set('number', 'numbercomponent');

  const projectComponents = new Map();
  projectComponents.set('foo', { x: 'xcomponent', y: 'ycomponent' });
  projectComponents.set('bar', { a: 'acomponent', b: 'bcomponent' });

  it('should set components', () => {
    const creator = new ComponentFactoryCreator({ components, projectComponents });

    const expectedMap = new Map();
    expectedMap.set('text', 'textcomponent');
    expectedMap.set('number', 'numbercomponent');
    expectedMap.set('foo_x', 'xcomponent');
    expectedMap.set('foo_y', 'ycomponent');
    expectedMap.set('bar_a', 'acomponent');
    expectedMap.set('bar_b', 'bcomponent');

    expect(creator['components']).to.deep.equal(expectedMap);
  });

  describe('getComponentFactory', () => {
    const components = new Map();
    components.set('x', { text: 'textcomponent' });
    components.set('y', { default: 'ycomponent' });
    components.set('z', { Default: 'zcomponent' });
    components.set('a', { element: () => 'acomponent' });

    const projectComponents = new Map();
    projectComponents.set('foo', {
      a: { text: 'acomponent' },
      b: { default: 'bcomponent' },
      c: { Default: 'ccomponent' },
      d: { element: () => 'dcomponent' },
    });

    const creator = new ComponentFactoryCreator({ components, projectComponents });

    describe('default', () => {
      const componentFactory = creator.getComponentFactory();

      it('should return dynamically imported component', () => {
        expect(componentFactory('a')).to.equal('acomponent');
      });

      it('should return component with custom export name', () => {
        expect(componentFactory('x', 'text')).to.equal('textcomponent');
      });

      it('should return component with Default export name', () => {
        expect(componentFactory('y')).to.equal('ycomponent');
      });

      it('should return component with default export', () => {
        expect(componentFactory('z')).to.equal('zcomponent');
      });

      it('should return undefined when component does not exist', () => {
        expect(componentFactory('c')).to.equal(undefined);
      });
    });

    describe('project name is provided', () => {
      const componentFactory = creator.getComponentFactory({ projectName: 'foo' });

      it('should return dynamically imported component', () => {
        expect(componentFactory('d')).to.equal('dcomponent');
      });

      it('should return component with custom export name', () => {
        expect(componentFactory('a', 'text')).to.equal('acomponent');
      });

      it('should return component with Default export name', () => {
        expect(componentFactory('c')).to.equal('ccomponent');
      });

      it('should return component with default export', () => {
        expect(componentFactory('b')).to.equal('bcomponent');
      });

      it('should return undefined when component does not exist', () => {
        expect(componentFactory('test')).to.equal(undefined);
      });
    });

    describe('editing', () => {
      it('default', () => {
        const componentFactory = creator.getComponentFactory({ isEditing: true });

        const dynamicImportSpy = spy(components.get('a'), 'element');

        expect(componentFactory('a')).to.equal('acomponent');
        expect(dynamicImportSpy.calledWith(true)).to.equal(true);
      });

      it('project name is provided', () => {
        const componentFactory = creator.getComponentFactory({
          projectName: 'foo',
          isEditing: true,
        });

        const dynamicImportSpy = spy(creator['components'].get('foo_d'), 'element');

        expect(componentFactory('d')).to.equal('dcomponent');
        expect(dynamicImportSpy.calledWith(true)).to.equal(true);
      });
    });
  });

  describe('getModuleFactory', () => {
    const components = new Map();
    components.set('x', { module: () => 'xcomponent' });
    components.set('y', { default: 'ycomponent' });

    const projectComponents = new Map();
    projectComponents.set('foo', {
      a: { module: () => 'acomponent' },
      b: { default: 'bcomponent' },
    });

    const creator = new ComponentFactoryCreator({ components, projectComponents });

    describe('default', () => {
      const moduleFactory = creator.getModuleFactory();

      it('should return component', () => {
        expect(moduleFactory('y')).to.deep.equal({ default: 'ycomponent' });
      });

      it('should return lazy loaded module', () => {
        expect(moduleFactory('x')).to.equal('xcomponent');
      });

      it('should return undefined if component does not exist', () => {
        expect(moduleFactory('test')).to.equal(undefined);
      });
    });

    describe('project name is provided', () => {
      const moduleFactory = creator.getModuleFactory({ projectName: 'foo' });

      it('should return component', () => {
        expect(moduleFactory('b')).to.deep.equal({ default: 'bcomponent' });
      });

      it('should return lazy loaded module', () => {
        expect(moduleFactory('a')).to.equal('acomponent');
      });

      it('should return undefined if component does not exist', () => {
        expect(moduleFactory('test')).to.equal(undefined);
      });
    });
  });

  describe('getComponent', () => {
    describe('project name is provided', () => {
      it('should return project component', () => {
        const creator = new ComponentFactoryCreator({ components, projectComponents });

        expect(creator['getComponent']({ componentName: 'b', projectName: 'bar' })).to.equal(
          'bcomponent'
        );
      });

      it('should return component when project component does not exist', () => {
        const creator = new ComponentFactoryCreator({ components, projectComponents });

        expect(creator['getComponent']({ componentName: 'number', projectName: 'bar' })).to.equal(
          'numbercomponent'
        );
      });
    });

    it('should return component', () => {
      const creator = new ComponentFactoryCreator({ components, projectComponents });

      expect(creator['getComponent']({ componentName: 'number' })).to.equal('numbercomponent');
    });

    it('should return undefined when component does not exist', () => {
      const creator = new ComponentFactoryCreator({ components, projectComponents });

      expect(creator['getComponent']({ componentName: 'test' })).to.equal(undefined);
    });
  });

  it('getProjectComponentName', () => {
    const creator = new ComponentFactoryCreator({ components: new Map() });

    expect(creator['getProjectComponentName']('foo', 'bar')).to.equal('foo_bar');
  });
});
