import { expect, use } from 'chai';
import nock from 'nock';
import spies from 'chai-spies';
import { JSDOM } from 'jsdom';
import * as events from '@sitecore-cloudsdk/events/browser';
import { executeScriptElements, loadForm, subscribeToFormSubmitEvent } from './form';
import { getEdgeProxyFormsUrl } from '../graphql';
import sinon from 'sinon';

use(spies);

describe('form', () => {
  let dom: JSDOM;

  process.env.DEBUG = 'sitecore-jss:form';

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      url: 'http://localhost',
      runScripts: 'dangerously',
    });
    global.document = dom.window.document;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('loadForm', () => {
    it('should load form', async () => {
      nock(getEdgeProxyFormsUrl('contextId', 'formId', 'https://bar.com'))
        .get('')
        .query({ sitecoreContextId: 'contextId' })
        .reply(200, 'form data');

      const result = await loadForm('contextId', 'formId', 'https://bar.com');

      expect(result).to.equal('form data');
    });

    it('should throw error if form loading fails', async () => {
      nock(getEdgeProxyFormsUrl('contextId', 'formId', 'https://bar.com'))
        .get('')
        .query({ sitecoreContextId: 'contextId' })
        .reply(500);

      try {
        await loadForm('contextId', 'formId', 'https://bar.com');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('executeScriptElements', () => {
    it('should execute script elements', () => {
      const form = global.document.createElement('form');
      const script = global.document.createElement('script');
      script.text = 'console.log("test")';

      global.document.body.appendChild(form);

      form.appendChild(script);

      const consoleLogSpy = sinon.spy(console, 'log');

      executeScriptElements(form);

      expect(consoleLogSpy.calledOnce).to.be.true;
      expect(consoleLogSpy.calledWith('test')).to.be.true;
    });
  });

  describe('subscribeToFormSubmitEvent', () => {
    it('should subscribe to form submit event', () => {
      const form = global.document.createElement('form');
      const input = global.document.createElement('input');

      global.document.body.appendChild(form);

      form.appendChild(input);

      const addEventListenerSpy = sinon.spy(form, 'addEventListener');

      subscribeToFormSubmitEvent(form, 'component-id');

      expect(addEventListenerSpy.calledWith('form:engage'));

      const formEvent = sinon.stub(events, 'form');

      form.dispatchEvent(
        new dom.window.CustomEvent('form:engage', {
          detail: { formId: 'formId', name: 'SUBMITTED' },
        })
      );

      expect(formEvent.calledWith('formId', 'SUBMITTED', 'componentId'));
    });
  });
});
