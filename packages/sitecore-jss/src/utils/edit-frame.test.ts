/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { commandBuilder, DefaultEditFrameButton } from '.';

describe('commandBuilder', () => {
  it('should handle no click', () => {
    const input = {
      click: '',
      ...DefaultEditFrameButton.edit
    };
    const output = commandBuilder(input);

    expect(output.click).to.be.equal('');
  });

  it('should handle javascript', () => {
    const input = {
      click: 'javascript:test',
      ...DefaultEditFrameButton.edit
    };
    const output = commandBuilder(input);

    expect(output.click).to.be.equal('javascript:test');
  });

  it('should handle chrome', () => {
    const input = {
      click: 'chrome:test',
      ...DefaultEditFrameButton.edit
    };
    const output = commandBuilder(input);

    expect(output.click).to.be.equal('chrome:test');
  });

  it('should handle no item', () => {
    const input = {
      click: 'item:new',
      ...DefaultEditFrameButton.edit
    };
    const output = commandBuilder(input);

    expect(output.click).to.be.equal('item:new');
  });

  it('should build a button', () => {
    const input = {
      click: 'item:new',
      ...DefaultEditFrameButton.edit
    };
    const output = commandBuilder(input, '123');

    expect(output.click).to.be.equal("javascript:Sitecore.PageModes.PageEditor.postRequest('item:new(id=123)',null,false)");
  });

  it('should handle button parameters', () => {
    const input = {
      click: 'item:new',
      parameters: {
        Navigate: 0,
      },
      ...DefaultEditFrameButton.edit
    };
    const output = commandBuilder(input, '123');

    expect(output.click).to.be.equal("javascript:Sitecore.PageModes.PageEditor.postRequest('item:new(id=123, Navigate=0)',null,false)");
  });

  it('should handle frame parameters', () => {
    const input = {
      click: 'item:new',
      ...DefaultEditFrameButton.edit
    };
    const output = commandBuilder(input, '123', {extra: 'Value'});

    expect(output.click).to.be.equal("javascript:Sitecore.PageModes.PageEditor.postRequest('item:new(id=123, extra=Value)',null,false)");
  });
});
