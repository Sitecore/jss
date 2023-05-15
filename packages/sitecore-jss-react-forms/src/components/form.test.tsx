/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import * as submit from '@sitecore-jss/sitecore-jss-forms/dist/cjs/submitForm';

import { Form, FormProps } from './form';
import Button from './field-templates/button';
import FileUpload from './field-templates/file-upload';

describe('<Form />', () => {
  const p = (): FormProps => ({
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
            itemId: 'model_item_id',
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
        } as forms.ButtonFormField,
        {
          model: {
            itemId: 'model_item_id',
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
  };

  describe('render', () => {
    it('should render message form is not provided', () => {
      const props = p();
      const c = shallow(<Form {...props} form={null} />);

      expect(c.html()).to.equal('<div>No form data was provided. Need to set a datasource?</div>');
    });

    it('should render message form metadata is not provided', () => {
      const props = p();

      delete props.form.metadata;

      const c = shallow(<Form {...props} />);

      expect(c.html()).to.equal(
        '<div>Form data invalid. Forget to set the rendering contents resolver?</div>'
      );
    });

    it('should render form with fields wrapped by fieldWrapperComponent', () => {
      const props = p();

      delete props.form.fields[1];

      const c = shallow(
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

      expect(c.html()).to.equal(
        '<form action="http://jssreactweb/api/jss/formbuilder?fxb.FormItemId=xxx-metadata-item-id&amp;fxb.HtmlPrefix=xxx-html-prefix&amp;sc_apikey={9B8C268A-171D-4DAA-B131-54B64614BBE0}&amp;sc_itemid=xxx-context-item-id" method="POST"><div class="form-errors"></div><span class="fieldWrapper"><h2>Test</h2><button type="submit" class="xxx_css-class" value="xxx_title" name="button-xxx" id="button-xxx">xxx_title</button></span></form>'
      );
    });
  });

  describe('onSubmit', () => {
    let submitForm;

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

      const c = shallow(<Form {...props} />);

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.then(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(formData);

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: [],
          nextForm: null,
          submitButton: null,
        });
      });
    });

    it('should submit form', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({ success: true, nextForm }));

      submitForm.returns(resolveSubmitResult);

      const c = shallow(<Form {...props} />);

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.then(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(formData);

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: [],
          nextForm,
          submitButton: null,
        });
      });
    });

    it('should not submit form when submitUrl is not provided', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: undefined } };

      const c = shallow(<Form {...props} />);

      try {
        (c.instance() as Form).onSubmit(ev as any);
      } catch (err) {
        expect(err.message).to.deep.equal(
          'Submit URL was not defined. Ensure the form has an action attribute.'
        );
      }
    });

    it('should submit form when form contains state', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({ success: true, nextForm }));

      submitForm.returns(resolveSubmitResult);

      const c = shallow(<Form {...props} />);

      c.setState({
        x1: {
          value: 'test-x1',
          isValid: true,
          errors: [],
        },
        x2: {
          value: undefined,
          isValid: true,
          errors: [],
        },
      });

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.then(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(
          formData.concat({ key: 'x1', value: 'test-x1' })
        );

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: [],
          nextForm,
          submitButton: null,
          x1: undefined,
          x2: undefined,
        });
      });
    });

    it('should submit form and apply validationErrors from result', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: false,
        nextForm,
        validationErrors: { x1: ['x1err1', 'x1err2'], x2: ['x2err2'] },
      }));

      submitForm.returns(resolveSubmitResult);

      const c = shallow(<Form {...props} />);

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.then(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(formData);

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: [],
          nextForm,
          submitButton: null,
          x1: {
            value: undefined,
            isValid: false,
            errors: ['x1err1', 'x1err2'],
          },
          x2: {
            value: undefined,
            isValid: false,
            errors: ['x2err2'],
          },
        });
      });
    });

    it('should submit form and use redirectUrl from response', () => {
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

      const c = shallow(<Form {...props} />);

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.then(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(formData);

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: [],
          nextForm,
          submitButton: null,
        });

        expect(window.location.href).to.equal('http://jssredirectweb');
      });
    });

    it('should submit form and call onRedirect using redirectUrl from response', () => {
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

      const c = shallow(<Form {...props} onRedirect={onRedirect} />);

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.then(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(formData);

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: [],
          nextForm,
          submitButton: null,
        });

        expect(onRedirect.calledWith('http://jssredirectweb')).to.be.true;
      });
    });

    it('should submit form and handle array of errors from result', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: false,
        errors: ['err1', 'err2'],
      }));

      submitForm.returns(resolveSubmitResult);

      const c = shallow(<Form {...props} />);

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.catch(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(formData);

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: ['err1', 'err2'],
          nextForm: null,
          submitButton: null,
        });
      });
    });

    it('should submit form and handle error from result', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveSubmitResult = Promise.resolve().then(() => ({
        success: false,
        errors: 'err1',
      }));

      submitForm.returns(resolveSubmitResult);

      const c = shallow(<Form {...props} />);

      (c.instance() as Form).onSubmit(ev as any);

      return resolveSubmitResult.catch(() => {
        expect(submitForm.args[0][0].data).to.deep.equal(formData);

        expect(submitForm.args[0][1]).to.equal('custom_submit_url');

        expect(c.state()).to.deep.equal({
          errors: ['err1'],
          nextForm: null,
          submitButton: null,
        });
      });
    });

    it('should submit form and handle error object from result', () => {
      const props = p();
      const ev = { preventDefault: sinon.spy(), target: { action: 'custom_submit_url' } };

      const resolveFormSubmit = Promise.reject({ message: 'Hello, I am error' });

      submitForm.returns(resolveFormSubmit);

      const c = shallow(<Form {...props} />);

      (c.instance() as Form).onSubmit(ev as any);

      setTimeout(() => {
        expect(c.state()).to.deep.equal({
          errors: ['Hello, I am error'],
          nextForm: null,
          submitButton: null,
        });
      }, 0);
    });
  });

  describe('getCurrentFieldState', () => {
    const field = () =>
      ({
        model: {
          value: 'xxx-model-value',
          fieldTypeItemId: 'xxx-fieldTypeItemId',
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

    it('should return null when non-valued field', () => {
      const props = p();
      const c = shallow(<Form {...props} />);

      const f = field();

      const state = (c.instance() as Form).getCurrentFieldState(f);

      expect(state).to.equal(null);
    });

    it('should return null when field name not defined', () => {
      const props = p();
      const c = shallow(<Form {...props} />);

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

      const state = (c.instance() as Form).getCurrentFieldState(f);

      expect(state).to.equal(null);
    });

    it('should return new state when form does not contain field state', () => {
      const props = p();
      const c = shallow(<Form {...props} />);

      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: 'xxx-valueField-name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      };

      const state = (c.instance() as Form).getCurrentFieldState(f);

      expect(state).to.deep.equal({
        isValid: true,
        errors: [],
        value: 'xxx-model-value',
      });
    });

    it('should return state when form contains field state', () => {
      const props = p();
      const c = shallow(<Form {...props} />);

      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: 'xxx-valueField-name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      };

      c.setState({
        'xxx-valueField-name': {
          isValid: true,
          errors: [],
          value: 'xxx-state-value',
        },
      });

      const state = (c.instance() as Form).getCurrentFieldState(f);

      expect(state).to.deep.equal({
        isValid: true,
        errors: [],
        value: 'xxx-state-value',
      });
    });

    it('should return state when form contains field state but value is undefined', () => {
      const props = p();
      const c = shallow(<Form {...props} />);

      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: 'xxx-valueField-name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      };

      c.setState({
        'xxx-valueField-name': {
          isValid: true,
          errors: [],
          value: undefined,
        },
      });

      const state = (c.instance() as Form).getCurrentFieldState(f);

      expect(state).to.deep.equal({
        isValid: true,
        errors: [],
        value: 'xxx-model-value',
      });
    });

    it('should return state when form contains field state but errors are undefined', () => {
      const props = p();
      const c = shallow(<Form {...props} />);

      const f = field();
      f.indexField = {
        name: 'xxx-indexField-name',
        id: 'xxx-indexField-id',
        value: 'xxx-indexField-value',
      };

      f.valueField = {
        name: 'xxx-valueField-name',
        id: 'xxx-valueField-id',
        value: 'xxx-valueField-value',
      };

      c.setState({
        'xxx-valueField-name': {
          isValid: true,
          errors: undefined,
          value: undefined,
        },
      });

      const state = (c.instance() as Form).getCurrentFieldState(f);

      expect(state).to.deep.equal({
        isValid: true,
        errors: [],
        value: 'xxx-model-value',
      });
    });
  });

  it('onButtonClick', () => {
    const props = p();
    const c = shallow(<Form {...props} />);

    (c.instance() as Form).onButtonClick('test');

    expect((c.state() as any).submitButton).to.equal('test');
  });

  it('onFieldChange', () => {
    const props = p();
    const c = shallow(<Form {...props} />);

    (c.instance() as Form).onFieldChange('test-key', 'test-value', true, ['err1', 'err2']);

    expect(c.state()['test-key'] as any).to.deep.equal({
      value: 'test-value',
      isValid: true,
      errors: ['err1', 'err2'],
    });
  });

  it('collectCurrentFieldValues', () => {
    const props = p();
    const c = shallow(<Form {...props} />);

    c.setState({
      errors: ['testerr1', 'testerr2'],
      nextForm: true,
      submitButton: 'test-submit-btn-key',
      x0: null,
      x1: {
        value: 'test-x1',
        isValid: true,
        errors: ['err-1', 'err-2'],
      },
      x2: {
        value: true,
        isValid: false,
      },
      x3: {
        value: ['tesxt-x30', 'tesxt-x31'],
        isValid: undefined,
      },
    });

    const fieldValues = (c.instance() as Form).collectCurrentFieldValues();

    expect(fieldValues).to.deep.equal([
      {
        fieldName: 'x1',
        state: {
          value: 'test-x1',
          isValid: true,
          errors: ['err-1', 'err-2'],
        },
      },
      {
        fieldName: 'x2',
        state: {
          value: true,
          isValid: false,
        },
      },
    ]);
  });

  it('resetFieldsState', () => {
    const props = p();
    const c = shallow(<Form {...props} />);

    c.setState({
      errors: ['testerr1', 'testerr2'],
      nextForm: true,
      submitButton: 'test-submit-btn-key',
      x1: true,
      x2: 'true',
      x3: false,
    });

    (c.instance() as Form).resetFieldsState();

    expect(c.state()).to.deep.equal({
      errors: [],
      nextForm: true,
      submitButton: 'test-submit-btn-key',
      x1: undefined,
      x2: undefined,
      x3: undefined,
    });
  });

  describe('createFieldComponent', () => {
    it('should create component', () => {
      const props = p();
      const c = shallow(<Form {...props} />);

      expect(c.state()).to.deep.equal({
        errors: [],
        nextForm: null,
        submitButton: null,
      });

      const buttonFieldComponent = (c.instance() as Form).createFieldComponent(
        props.form.fields[0]
      );

      const buttonC = mount(<div>{buttonFieldComponent}</div>);

      const button = buttonC.find(Button);

      expect(button.html()).to.equal(
        '<button type="submit" class="xxx_css-class" value="xxx_title" name="button-xxx" id="button-xxx">xxx_title</button>'
      );

      button.prop('onButtonClick')('button-xxx');

      expect((c.state() as any).submitButton).to.equal('button-xxx');

      const fileUploadFieldComponent = (c.instance() as Form).createFieldComponent(
        props.form.fields[1]
      );

      const fileUploadC = mount(<div>{fileUploadFieldComponent}</div>);

      const fileUpload = fileUploadC.find(FileUpload);

      expect(fileUpload.html()).to.equal(
        '<label for="xxx_file_upload_value_field_id" class="xxx_label-css-class invalid">xxx_title</label><input type="file" multiple="" class="xxx_css-class" id="xxx_file_upload_value_field_id" name="xxx_file_upload_value_field_name">'
      );
    });
  });
});
