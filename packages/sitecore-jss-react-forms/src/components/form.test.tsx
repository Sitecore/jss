/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { render, waitFor, fireEvent, findByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import React from 'react';
import * as submit from '@sitecore-jss/sitecore-jss-forms/dist/cjs/submitForm';

import { Form, FormProps, FormState, FieldStateCollection } from './form';
import { FieldWithValueProps } from '../FieldProps';
import { FieldState } from '../../types/components/form';

describe('<Form />', () => {
  const p = (): FormProps => ({
    language: 'da-DK',
    sitecoreApiHost: 'http://jssreactweb',
    sitecoreApiKey: '{9B8C268A-171D-4DAA-B131-54B64614BBE0}',
    form: {
      metadata: {
        cssClass: 'xxx-metadata-css-class',
        fieldTypeItemId: '{7CE25CAB-EF3A-4F73-AB13-D33BDC1E4EE2}',
        isTrackingEnabled: true,
        itemId: 'xxx-metadata-item-id',
        name: 'xxx-metadata-name',
        templateId: 'xxx-metadata-template-id',
        title: 'xxx-metadata-title',
        validationDataModels: [
          {
            itemId: 'validation-model-xxx',
            message: 'validation-model-xxx-message',
            name: 'validation-model-xxx-name',
          },
          {
            itemId: 'validation-model-yyy',
            message: 'validation-model-yyy-message',
            name: 'validation-model-yyy-name',
          },
          {
            itemId: 'validation-model-zzz',
            message: 'validation-model-zzz-message',
            name: 'validation-model-zzz-name',
          },
        ],
      },
      fields: [
        {
          model: {
            itemId: 'model_item_id_button_field',
            title: 'xxx_title',
            name: 'button-field',
            templateId: 'xxx_templateId',
            cssClass: 'xxx_css-class',
            value: '',
            fieldTypeItemId: '{7CE25CAB-EF3A-4F73-AB13-D33BDC1E4EE2}',
            validationDataModels: [
              { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
              { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
              { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
            ],
          },
          buttonField: {
            name: 'button-xxx',
            id: 'button-xxx',
            value: 'button-xxx',
          },
          navigationButtonsField: {
            name: 'xxx',
            id: 'xxx',
            value: 'xxx',
          },
          navigationStepField: {
            name: 'yyy',
            id: 'yyy',
            value: 'yyy',
          },
        },
        {
          model: {
            itemId: 'model_item_id_single_line_text',
            isTrackingEnabled: true,
            title: 'xxx_title',
            name: 'single_line_text-field',
            templateId: 'xxx_templateId',
            cssClass: 'xxx_css-single_line_text',
            labelCssClass: 'xxx_label-css-class',
            isMultiple: true,
            allowedContentTypes: '.jpg, .css',
            maxFileCount: 1,
            maxFileSize: 9999,
            fileSizeUnit: 1024,
            files: [],
            required: true,
            value: '',
            fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
            validationDataModels: [
              { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
              { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
              { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
            ],
          },
          valueField: {
            id: 'xxx_text_value_field_id',
            name: 'xxx_text_value_field_name',
            value: 'xxx_text_value_field_name',
          },
        },
        {
          model: {
            itemId: 'model_item_id_file_upload',
            isTrackingEnabled: true,
            title: 'xxx_title',
            name: 'file-upload-field',
            templateId: 'xxx_templateId',
            cssClass: 'xxx_css-class',
            labelCssClass: 'xxx_label-css-class',
            isMultiple: true,
            allowedContentTypes: '.jpg, .css',
            maxFileCount: 1,
            maxFileSize: 9999,
            fileSizeUnit: 1024,
            files: [],
            required: true,
            value: '',
            fieldTypeItemId: '{7E9A0903-A52C-4843-BBE1-5B26BD162BED}',
            validationDataModels: [
              { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
              { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
              { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
            ],
          },
          valueField: {
            id: 'xxx_file_upload_value_field_id',
            name: 'xxx_file_upload_value_field_name',
            value: 'xxx_file_upload_value_field_name',
          },
        },
      ],
      htmlPrefix: 'xxx-html-prefix',
      contextItemId: 'xxx-context-item-id',
      antiForgeryToken: {
        name: 'xxx-anti-forgery-token-name',
        id: 'xxx-anti-forgery-token',
        value: 'xxx-anti-forgery-token-value',
      },
      formItemId: {
        name: 'xxx-form-item-id-name',
        id: 'xxx-form-item-id',
        value: 'xxx-form-item-id-value',
      },
      formSessionId: {
        name: 'xxx-form-session-id-name',
        id: 'xxx-form-session-id',
        value: 'xxx-form-session-id-value',
      },
      pageItemId: {
        name: 'xxx-page-item-id-name',
        id: 'xxx-page-item-id',
        value: 'xxx-page-item-id-value',
      },
    },
  });

  const nextForm = {
    metadata: {
      cssClass: 'provided-xxx-metadata-css-class',
      fieldTypeItemId: '{7CE25CAB-EF3A-4F73-AB13-D33BDC1E4EE2}',
      isTrackingEnabled: true,
      itemId: 'provided-xxx-metadata-item-id',
      name: 'provided-xxx-metadata-name',
      templateId: 'provided-xxx-metadata-template-id',
      title: 'provided-xxx-metadata-title',
      validationDataModels: [
        {
          itemId: 'provided-validation-model-xxx',
          message: 'provided-validation-model-xxx-message',
          name: 'provided-validation-model-xxx-name',
        },
        {
          itemId: 'provided-validation-model-yyy',
          message: 'provided-validation-model-yyy-message',
          name: 'provided-validation-model-yyy-name',
        },
        {
          itemId: 'provided-validation-model-zzz',
          message: 'provided-validation-model-zzz-message',
          name: 'provided-validation-model-zzz-name',
        },
      ],
    },
    fields: [
      {
        model: {
          itemId: 'model_item_id_button_next_form',
          title: 'nnn_title',
          name: 'button-field',
          templateId: 'nnn_templateId',
          cssClass: 'nnn_css-class',
          value: '',
          fieldTypeItemId: '{7CE25CAB-EF3A-4F73-AB13-D33BDC1E4EE2}',
          validationDataModels: [
            { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
            { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
            { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
          ],
        },
        buttonField: {
          name: 'button-nnn',
          id: 'button-nnn',
          value: 'button-nnn',
        },
        navigationButtonsField: {
          name: 'nnn',
          id: 'nnn',
          value: 'nnn',
        },
        navigationStepField: {
          name: 'nnn',
          id: 'nnn',
          value: 'nnn',
        },
      } as forms.ButtonFormField,
      {
        model: {
          itemId: 'model_item_id_file_next_form',
          isTrackingEnabled: true,
          title: 'nnn_title',
          name: 'file-upload-field',
          templateId: 'nnn_templateId',
          cssClass: 'nnn_css-class',
          labelCssClass: 'nnn_label-css-class',
          isMultiple: true,
          allowedContentTypes: '.jpg, .css',
          maxFileCount: 1,
          maxFileSize: 9999,
          fileSizeUnit: 1024,
          files: [],
          required: true,
          value: '',
          fieldTypeItemId: '{7E9A0903-A52C-4843-BBE1-5B26BD162BED}',
          validationDataModels: [
            { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
            { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
            { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
          ],
        },
        valueField: {
          id: 'nnn_file_upload_value_field_id',
          name: 'nnn_file_upload_value_field_name',
          value: 'nnn_file_upload_value_field_name',
        },
      },
    ],
    htmlPrefix: 'xxx-html-prefix',
    contextItemId: 'xxx-context-item-id',
    antiForgeryToken: {
      name: 'xxx-anti-forgery-token-name',
      id: 'xxx-anti-forgery-token',
      value: 'xxx-anti-forgery-token-value',
    },
    formItemId: {
      name: 'xxx-form-item-id-name',
      id: 'xxx-form-item-id',
      value: 'xxx-form-item-id-value',
    },
    formSessionId: {
      name: 'xxx-form-session-id-name',
      id: 'xxx-form-session-id',
      value: 'xxx-form-session-id-value',
    },
    pageItemId: {
      name: 'xxx-page-item-id-name',
      id: 'xxx-page-item-id',
      value: 'xxx-page-item-id-value',
    },
  };

  const testFieldWrapper: React.FC<FieldWithValueProps> = ({ children, field }) => (
    <div className={`test-field-state-wrapper-${field.model.itemId}`}>{children}</div>
  );

  const testFieldWrapperWithState: React.FC<FieldWithValueProps> = ({
    value,
    isValid,
    errors,
    children,
    field,
  }) => (
    <div className={`test-field-state-wrapper-${field.model.itemId}`}>
      <script className={`test-field-state-${field.model.itemId}`}>
        {JSON.stringify({ value, isValid, errors })}
      </script>
      {children}
    </div>
  );

  const getFormState = (renderedElement: HTMLElement) => {
    const testScriptElement = renderedElement.querySelector('script#test-form-state');
    return JSON.parse(testScriptElement?.innerHTML || '{}') as FieldStateCollection & FormState;
  };

  const getCollectedFields = (renderedElement: HTMLElement) => {
    const testScriptElement = renderedElement.querySelector('script#test-collect-fields');
    return JSON.parse(testScriptElement?.innerHTML || '{}') as FieldStateCollection;
  };

  describe('render', () => {
    it('should render message form is not provided', () => {
      const props = p();
      const c = render(<Form {...props} form={null} />);

      expect(c.container.innerHTML).to.equal(
        '<div>No form data was provided. Need to set a datasource?</div>'
      );
    });

    it('should render message form metadata is not provided', () => {
      const props = p();

      delete props.form.metadata;

      const c = render(<Form {...props} />);

      expect(c.container.innerHTML).to.equal(
        '<div>Form data invalid. Forget to set the rendering contents resolver?</div>'
      );
    });

    it('should render form with fields wrapped by fieldWrapperComponent', () => {
      const props = p();

      delete props.form.fields[1];
      delete props.form.fields[2];

      const rendered = render(
        <Form
          {...props}
          fieldWrapperComponent={({ children }) => (
            <span className="fieldWrapper">
              <h2>Test</h2>
              {children}
            </span>
          )}
        />
      );

      expect(rendered.container.innerHTML).to.contain(
        '<form action="http://jssreactweb/api/jss/formbuilder?fxb.FormItemId=xxx-metadata-item-id&amp;fxb.HtmlPrefix=xxx-html-prefix&amp;sc_apikey={9B8C268A-171D-4DAA-B131-54B64614BBE0}&amp;sc_itemid=xxx-context-item-id&amp;sc_lang=da-DK" method="POST">'
      );
      expect(rendered.container.innerHTML).to.contain('<div class="form-errors"></div>');
      expect(rendered.container.innerHTML).to.contain(
        '<span class="fieldWrapper"><h2>Test</h2><button type="submit" class="xxx_css-class" value="xxx_title" name="button-xxx" id="button-xxx">xxx_title</button></span>'
      );
    });
  });

  describe('onSubmit', () => {
    let submitForm: sinon.SinonStub;

    const formData = [
      { key: 'xxx-form-session-id-name', value: 'xxx-form-session-id-value' },
      {
        key: 'xxx-anti-forgery-token-name',
        value: 'xxx-anti-forgery-token-value',
      },
      { key: 'xxx-form-item-id-name', value: 'xxx-form-item-id-value' },
      { key: 'xxx-page-item-id-name', value: 'xxx-page-item-id-value' },
      { key: 'button-xxx', value: 'xxx_title' },
      { key: 'xxx', value: 'xxx' },
      { key: 'yyy', value: 'yyy' },
    ];

    beforeEach(() => {
      submitForm = sinon.stub(submit, 'submitForm');
    });

    afterEach(() => {
      submitForm.restore();
    });

    it('should submit form without next form result', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };
      const resolveSubmitResult = Promise.resolve().then(() => ({ success: true }));
      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);
      const form = rendered.container.querySelector('form')!;
      fireEvent.submit(form, ev);

      expect(submitForm.args[0][0].data).to.deep.equal(formData);
      expect(submitForm.args[0][1]).to.equal('custom_submit_url');
    });

    it('should submit form', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };
      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: true,
        nextForm,
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;

      fireEvent.submit(form, ev);

      expect(submitForm.args[0][0].data).to.deep.equal(formData);
      expect(submitForm.args[0][1]).to.equal('custom_submit_url');

      await waitFor(() => expect(rendered.getAllByText('nnn_title').length).to.equal(2));
    });

    it('should not submit form when submitUrl is not provided', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: undefined } };

      const rendered = render(<Form {...props} />);
      const form = rendered.container.querySelector('form')!;

      try {
        fireEvent.submit(form, ev);
      } catch (err) {
        expect(err.message).to.deep.equal(
          'Submit URL was not defined. Ensure the form has an action attribute.'
        );
      }
    });

    it('should submit form when form contains state', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: true,
        nextForm,
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);
      const form = rendered.container.querySelector('form')!;

      const singleLineTextInput = rendered.container.querySelector(
        'input#xxx_text_value_field_id'
      )!;

      const user = userEvent.setup();
      await user.type(singleLineTextInput, 'some text');

      fireEvent.submit(form, ev);

      expect(submitForm.args[0][1]).to.equal('custom_submit_url');
      expect(submitForm.args[0][0].data).to.deep.equal(
        formData.concat({ key: 'xxx_text_value_field_name', value: 'some text' })
      );
      await waitFor(() => expect(rendered.getAllByText('nnn_title').length).to.equal(2));
    });

    it('should submit form and apply validationErrors from result', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: false,
        nextForm: null,
        validationErrors: { xxx_text_value_field_name: ['x1err1', 'x1err2'] },
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;
      fireEvent.submit(form, ev);

      await findByText(rendered.container, 'x1err1');
      await findByText(rendered.container, 'x1err2');
      expect(rendered.container.querySelector('.form-errors')?.childNodes.length).to.be.equal(1);
    });

    it('should submit form and use redirectUrl from response', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      delete window.location;

      window.location = { href: '' } as any;

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: true,
        nextForm,
        redirectUrl: 'http://jssredirectweb',
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;
      fireEvent.submit(form, ev);

      expect(submitForm.args[0][1]).to.equal('custom_submit_url');
      expect(submitForm.args[0][0].data).to.deep.equal(formData);

      await waitFor(() => {
        expect(window.location.href).to.equal('http://jssredirectweb');
      });
    });

    it('should submit form and call onRedirect using redirectUrl from response', async () => {
      const props = p();
      const onRedirect = sinon.spy();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      delete window.location;

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: true,
        nextForm,
        redirectUrl: 'http://jssredirectweb',
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} onRedirect={onRedirect} />);

      const form = rendered.container.querySelector('form')!;
      fireEvent.submit(form, ev);

      expect(submitForm.args[0][1]).to.equal('custom_submit_url');
      expect(submitForm.args[0][0].data).to.deep.equal(formData);

      await waitFor(() => {
        expect(onRedirect.calledWith('http://jssredirectweb')).to.be.true;
      });
    });

    it('should set submitInProgress in state to true during submit', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: true,
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;
      expect(getFormState(rendered.container).submitInProgress).to.be.undefined;
      fireEvent.submit(form, ev);
      expect(getFormState(rendered.container).submitInProgress).to.be.true;
    });

    it('should return form to non-inert state after submit is done', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: true,
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;

      fireEvent.submit(form, ev);

      expect(getFormState(rendered.container).submitInProgress).to.be.true;

      await waitFor(() => {
        expect(getFormState(rendered.container).submitInProgress).to.be.false;
      });
    });

    it('should submit form and handle array of errors from result', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: false,
        nextForm: null,
        errors: ['err1', 'err2'],
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;
      fireEvent.submit(form, ev);

      await findByText(rendered.container, 'err1');
      await findByText(rendered.container, 'err2');
      expect(rendered.container.querySelector('.form-errors')?.childNodes.length).to.be.equal(2);
    });

    it('should submit form and handle error from result', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: false,
        nextForm: null,
        errors: 'err1',
      }));

      submitForm.returns(resolveSubmitResult);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;
      fireEvent.submit(form, ev);

      await findByText(rendered.container, 'err1');
      expect(rendered.container.querySelector('.form-errors')?.childNodes.length).to.be.equal(1);
    });

    it('should submit form and handle error object from result', async () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveFormSubmit = Promise.reject({ message: 'Hello, I am error' });

      submitForm.returns(resolveFormSubmit);

      const rendered = render(<Form {...props} />);

      const form = rendered.container.querySelector('form')!;
      fireEvent.submit(form, ev);

      await findByText(rendered.container, 'Hello, I am error');
    });
  });

  describe('getCurrentFieldState', () => {
    const field = () =>
      ({
        model: {
          value: 'xxx-model-value',
          fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
          itemId: 'xxx-itemId',
          name: 'xxx-name',
          templateId: 'xxx-templateId',
          validationDataModels: [
            { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
            { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
            { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
          ],
        },
      } as any);

    const nonValuedfield = () =>
      ({
        model: {
          value: 'xxx-model-value',
          fieldTypeItemId: '',
          itemId: 'xxx-itemId',
          name: 'xxx-name',
          templateId: 'xxx-templateId',
        },
      } as any);

    const getFieldState = (fieldItemId: string, renderedElement: HTMLElement) => {
      const testFieldScriptElement = renderedElement.querySelector(
        `script.test-field-state-${fieldItemId}`
      )!;
      const fieldState = JSON.parse(testFieldScriptElement?.innerHTML) as FieldState;

      if (!fieldState || Object.keys(fieldState).length === 0) {
        return null;
      }

      return fieldState;
    };

    it('should return null when non-valued field', () => {
      const props = p();
      const nvf = nonValuedfield();
      props.form.fields.push(nvf);

      const rendered = render(
        <Form {...props} fieldWrapperComponent={testFieldWrapperWithState} />
      );
      const fieldState = getFieldState(nvf.model.itemId, rendered.container);

      expect(fieldState).to.equal(null);
    });

    it('should return null when field name not defined', () => {
      const props = p();

      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: undefined,
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      };

      props.form.fields.push(f);

      const rendered = render(
        <Form {...props} fieldWrapperComponent={testFieldWrapperWithState} />
      );

      const state = getFieldState(f.model.itemId, rendered.container);
      expect(state).to.equal(null);
    });

    it('should return new state when form does not contain field state', () => {
      const props = p();
      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: 'xxx_valueField_name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      };
      props.form.fields.push(f);

      const rendered = render(
        <Form {...props} fieldWrapperComponent={testFieldWrapperWithState} />
      );
      const state = getFieldState(f.model.itemId, rendered.container);

      expect(state).to.deep.equal({
        isValid: true,
        errors: [],
        value: 'xxx-model-value',
      });
    });

    it('should return state when form contains field state', async () => {
      const props = p();

      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: 'xxx_valueField_name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      };
      props.form.fields.push(f);

      const rendered = render(
        <Form {...props} fieldWrapperComponent={testFieldWrapperWithState} />
      );
      const state = getFieldState(f.model.itemId, rendered.container);

      expect(state).to.deep.equal({
        isValid: true,
        errors: [],
        value: 'xxx-model-value',
      });

      const user = userEvent.setup();
      const testSingleLineTextInput = rendered.container.querySelector(`input#${f.valueField.id}`)!;
      user.clear(testSingleLineTextInput);
      user.type(testSingleLineTextInput, 'some text');

      await waitFor(() => {
        const nextState = getFieldState(f.model.itemId, rendered.container);
        expect(nextState).to.deep.equal({
          isValid: true,
          errors: [],
          value: 'some text',
        });
      });
    });

    it('should return state when form contains field state but value is undefined', () => {
      const props = p();
      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: 'xxx_valueField_name',
        id: 'xxx-valueField-id',
        value: undefined,
      };
      props.form.fields.push(f);

      const rendered = render(
        <Form {...props} fieldWrapperComponent={testFieldWrapperWithState} />
      );
      const state = getFieldState(f.model.itemId, rendered.container);

      expect(state).to.deep.equal({
        isValid: true,
        errors: [],
        value: 'xxx-model-value',
      });
    });
  });

  it('onButtonClick', async () => {
    const props = p();
    const rendered = render(<Form {...props} />);

    userEvent.setup();
    const user = userEvent.setup();
    const buttonElement = rendered.container.querySelector('button[name=button-xxx]')!;
    await user.click(buttonElement);

    const state = getFormState(rendered.container);
    expect(state.submitButton).to.equal('button-xxx');
  });

  it('onFieldChange', async () => {
    const props = p();
    const field = {
      model: {
        value: 'xxx-model-value',
        fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
        itemId: 'xxx-itemId',
        name: 'xxx-name',
        templateId: 'xxx-templateId',
        required: true,
        title: 'xxx_title',
        validationDataModels: [
          { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
          { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
          { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
        ],
      },
      indexField: {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      },
      valueField: {
        name: 'xxx_valueField_name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      },
    };
    props.form.fields.push(field);
    const rendered = render(<Form {...props} />);

    const user = userEvent.setup();
    const testSingleLineTextInput = rendered.container.querySelector(
      `input#${field.valueField.id}`
    )!;
    await user.clear(testSingleLineTextInput);

    const formState = getFormState(rendered.container);

    // eslint-disable-next-line dot-notation
    expect(formState['xxx_valueField_name'] as any).to.deep.equal({
      value: '',
      isValid: false,
      errors: ['xxx_title is required'],
    });
  });

  it('collectCurrentFieldValues', async () => {
    const props = p();
    const field = {
      model: {
        value: 'xxx-model-value',
        fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
        itemId: 'xxx-itemId',
        name: 'xxx-name',
        templateId: 'xxx-templateId',
        required: true,
        title: 'xxx_title',
        validationDataModels: [
          { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
          { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
          { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
        ],
      },
      indexField: {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      },
      valueField: {
        name: 'xxx_valueField_name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      },
    };
    props.form.fields.push(field);
    const rendered = render(<Form {...props} />);

    const user = userEvent.setup();
    const testInvalidSingleLineTextInput = rendered.container.querySelector(
      `input#${field.valueField.id}`
    )!;
    await user.clear(testInvalidSingleLineTextInput);

    const testSingleLineTextInput = rendered.container.querySelector(
      'input#xxx_text_value_field_id'
    )!;
    await user.clear(testSingleLineTextInput);
    await user.type(testSingleLineTextInput, 'some text');

    const collectedFieldsState = getCollectedFields(rendered.container);

    expect(collectedFieldsState).to.deep.equal([
      {
        fieldName: 'xxx_valueField_name',
        state: { value: '', isValid: false, errors: ['xxx_title is required'] },
      },
      {
        fieldName: 'xxx_text_value_field_name',
        state: { value: 'some text', isValid: true, errors: [] },
      },
    ]);
  });

  it('resetFieldsState', async () => {
    const submitForm = sinon.stub(submit, 'submitForm');
    const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };
    const resolveSubmitResult = Promise.resolve().then(() => ({
      success: true,
      nextForm,
    }));

    submitForm.returns(resolveSubmitResult);

    const props = p();
    const field = {
      model: {
        value: 'xxx-model-value',
        fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
        itemId: 'xxx-itemId',
        name: 'xxx-name',
        templateId: 'xxx-templateId',
        required: true,
        title: 'xxx_title',
        validationDataModels: [
          { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
          { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
          { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
        ],
      },
      valueField: {
        name: 'xxx_valueField_name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      },
    };
    props.form.fields.push(field);
    const rendered = render(<Form {...props} />);

    const user = userEvent.setup();
    const testInvalidSingleLineTextInput = rendered.container.querySelector(
      `input#${field.valueField.id}`
    )!;
    await user.clear(testInvalidSingleLineTextInput);
    await user.type(testInvalidSingleLineTextInput, 'some text');

    const testSingleLineTextInput = rendered.container.querySelector(
      'input#xxx_text_value_field_id'
    )!;
    await user.clear(testSingleLineTextInput);
    await user.type(testSingleLineTextInput, 'some other text');

    const formState = getFormState(rendered.container);
    expect(formState.xxx_valueField_name).to.not.be.undefined;
    expect(formState.xxx_text_value_field_name).to.not.be.undefined;

    const form = rendered.container.querySelector('form')!;
    fireEvent.submit(form, ev);

    await waitFor(() => {
      const nreFormState = getFormState(rendered.container);
      expect(nreFormState.xxx_valueField_name).to.be.undefined;
      expect(nreFormState.xxx_text_value_field_name).to.be.undefined;
    });

    submitForm.restore();
  });

  describe('createFieldComponent', () => {
    it('should create component', () => {
      const props = p();
      const rendered = render(<Form {...props} fieldWrapperComponent={testFieldWrapper} />);
      const formState = getFormState(rendered.container);
      expect(formState).to.deep.equal({
        errors: [],
        nextForm: null,
        submitButton: null,
      });

      const button = rendered.container.querySelector('button')!;

      expect(button.outerHTML).to.equal(
        '<button type="submit" class="xxx_css-class" value="xxx_title" name="button-xxx" id="button-xxx">xxx_title</button>'
      );

      const fileUpload = rendered.container.querySelector(
        'div.test-field-state-wrapper-model_item_id_file_upload'
      )!;

      expect(fileUpload.innerHTML).to.contain(
        '<label for="xxx_file_upload_value_field_id" class="xxx_label-css-class invalid">xxx_title</label><input multiple="" class="xxx_css-class" id="xxx_file_upload_value_field_id" type="file" name="xxx_file_upload_value_field_name">'
      );
    });
  });
});
