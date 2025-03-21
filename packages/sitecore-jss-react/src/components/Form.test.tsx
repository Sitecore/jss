import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import { SitecoreContext } from './SitecoreContext';
import sinon from 'sinon';

describe('Form', () => {
  const context = {
    api: {
      edge: {
        contextId: 'context-id',
        edgeUrl: 'edge-url',
      },
    },
    layoutData: {
      normal: {
        sitecore: {
          context: {
            pageEditing: false,
          },
        },
      },
      editing: {
        sitecore: {
          context: {
            pageEditing: true,
          },
        },
      },
    },
  };

  const rendering = {
    uid: '123',
    params: {
      FormId: '456',
      styles: 'form-class',
      RenderingIdentifier: 'form-id',
    },
  };

  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  it('should render form', async () => {
    const loadFormSpy = sinon.spy((contextId: string, formId: string, edgeUrl?: string) => {
      expect(contextId).to.equal('context-id');
      expect(formId).to.equal('456');
      expect(edgeUrl).to.equal('edge-url');

      return Promise.resolve(
        '<form id="test-form">\n' +
          '<script type="javascript">console.log(\'script 1\');</script>\n' +
          '<script type="javascript">console.log(\'script 2\');</script></form>'
      );
    });
    const subscribeToFormSubmitEventSpy = sinon.spy();
    const executeScriptElementsSpy = sinon.spy();

    const { Form } = proxyquire('./Form', {
      '@sitecore-jss/sitecore-jss/form': {
        loadForm: loadFormSpy,
        subscribeToFormSubmitEvent: subscribeToFormSubmitEventSpy,
        executeScriptElements: executeScriptElementsSpy,
      },
    });

    const rendered = await mount(
      <SitecoreContext api={context.api} layoutData={context.layoutData.normal}>
        <Form rendering={rendering} params={rendering.params} />
      </SitecoreContext>
    );

    // Wait for useEffect to re-run
    await clock.nextAsync();

    expect(loadFormSpy.calledOnce).to.be.true;
    expect(subscribeToFormSubmitEventSpy.calledOnce).to.be.true;
    expect(executeScriptElementsSpy.calledOnce).to.be.true;

    expect(rendered.html()).to.equal(
      '<div class="form-class" id="form-id">' +
        '<form id="test-form">\n' +
        '<script type="javascript">console.log(\'script 1\');</script>\n' +
        '<script type="javascript">console.log(\'script 2\');</script></form></div>'
    );
  });

  it('should render form in edit mode', async () => {
    const loadFormSpy = sinon.spy((contextId: string, formId: string, edgeUrl?: string) => {
      expect(contextId).to.equal('context-id');
      expect(formId).to.equal('456');
      expect(edgeUrl).to.equal('edge-url');

      return Promise.resolve(
        '<form id="test-form">\n' +
          '<script type="javascript">console.log(\'script 1\');</script>\n' +
          '<script type="javascript">console.log(\'script 2\');</script></form>'
      );
    });
    const subscribeToFormSubmitEventSpy = sinon.spy();
    const executeScriptElementsSpy = sinon.spy();

    const { Form } = proxyquire('./Form', {
      '@sitecore-jss/sitecore-jss/form': {
        loadForm: loadFormSpy,
        subscribeToFormSubmitEvent: subscribeToFormSubmitEventSpy,
        executeScriptElements: executeScriptElementsSpy,
      },
    });

    const rendered = await mount(
      <SitecoreContext api={context.api} layoutData={context.layoutData.editing}>
        <Form rendering={rendering} params={rendering.params} />
      </SitecoreContext>
    );

    // Wait for useEffect to re-run
    await clock.nextAsync();

    expect(loadFormSpy.calledOnce).to.be.true;
    expect(subscribeToFormSubmitEventSpy.notCalled).to.be.true;
    expect(executeScriptElementsSpy.calledOnce).to.be.true;

    expect(rendered.html()).to.equal(
      '<div class="form-class" id="form-id">' +
        '<form id="test-form">\n' +
        '<script type="javascript">console.log(\'script 1\');</script>\n' +
        '<script type="javascript">console.log(\'script 2\');</script></form></div>'
    );
  });

  it('should render empty component when loading fails', async () => {
    const rendering = {
      uid: '123',
      params: {
        FormId: '456',
        styles: 'form-class',
        RenderingIdentifier: 'form-id',
      },
    };

    const loadFormSpy = sinon.spy(() => {
      return Promise.reject(new Error('Failed to load form'));
    });
    const subscribeToFormSubmitEventSpy = sinon.spy();
    const executeScriptElementsSpy = sinon.spy();

    const { Form } = proxyquire('./Form', {
      '@sitecore-jss/sitecore-jss/form': {
        loadForm: loadFormSpy,
        subscribeToFormSubmitEvent: subscribeToFormSubmitEventSpy,
        executeScriptElements: executeScriptElementsSpy,
      },
    });

    const rendered = await mount(
      <SitecoreContext api={context.api} layoutData={context.layoutData.normal}>
        <Form rendering={rendering} params={rendering.params} />
      </SitecoreContext>
    );

    expect(loadFormSpy.calledOnce).to.be.true;
    expect(subscribeToFormSubmitEventSpy.notCalled).to.be.true;
    expect(executeScriptElementsSpy.notCalled).to.be.true;
    expect(rendered.html()).to.equal('<div class="form-class" id="form-id"></div>');
  });

  it('should render error message in edit mode when loading fails', async () => {
    const rendering = {
      uid: '123',
      params: {
        FormId: '456',
        styles: 'form-class',
        RenderingIdentifier: 'form-id',
      },
    };

    const loadFormSpy = sinon.spy(() => {
      return Promise.reject(new Error('Failed to load form'));
    });
    const subscribeToFormSubmitEventSpy = sinon.spy();
    const executeScriptElementsSpy = sinon.spy();

    const { Form } = proxyquire('./Form', {
      '@sitecore-jss/sitecore-jss/form': {
        loadForm: loadFormSpy,
        subscribeToFormSubmitEvent: subscribeToFormSubmitEventSpy,
        executeScriptElements: executeScriptElementsSpy,
      },
    });

    const rendered = await mount(
      <SitecoreContext api={context.api} layoutData={context.layoutData.editing}>
        <Form rendering={rendering} params={rendering.params} />
      </SitecoreContext>
    );

    // Wait for useEffect to re-run
    await clock.nextAsync();

    expect(loadFormSpy.calledOnce).to.be.true;
    expect(subscribeToFormSubmitEventSpy.notCalled).to.be.true;
    expect(executeScriptElementsSpy.notCalled).to.be.true;
    expect(rendered.html()).to.equal(
      '<div class="sc-jss-placeholder-error">There was a problem loading this section</div>'
    );
  });
});
