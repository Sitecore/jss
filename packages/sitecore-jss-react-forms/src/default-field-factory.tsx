import Section from './components/field-templates/section';
import TextField from './components/field-templates/text';
import FileUpload from './components/field-templates/file-upload';
import SingleLineText from './components/field-templates/single-line-text';
import Button from './components/field-templates/button';
import Checkbox from './components/field-templates/checkbox';
import CheckboxList from './components/field-templates/checkbox-list';
import DropdownList from './components/field-templates/dropdown-list';
import DateField from './components/field-templates/date';
import Email from './components/field-templates/email';
import ListBox from './components/field-templates/list-box';
import MultipleLineText from './components/field-templates/multiple-line-text';
import NumberField from './components/field-templates/number';
import Password from './components/field-templates/password';
import RadioButtonList from './components/field-templates/radio-button-list';
import Telephone from './components/field-templates/telephone';
import { FieldTypes } from './FieldTypes';
import FieldFactory from './field-factory';

/**
 * Create default field factory
 */
export function createDefaultFieldFactory() {
  const defaultFieldFactory = new FieldFactory();

  defaultFieldFactory.setComponent(FieldTypes.Section, Section);
  defaultFieldFactory.setComponent(FieldTypes.TextField, TextField);
  defaultFieldFactory.setComponent(FieldTypes.Button, Button);
  defaultFieldFactory.setComponent(FieldTypes.SingleLineText, SingleLineText);
  defaultFieldFactory.setComponent(FieldTypes.MultipleLineText, MultipleLineText);
  defaultFieldFactory.setComponent(FieldTypes.DateField, DateField);
  defaultFieldFactory.setComponent(FieldTypes.Email, Email);
  defaultFieldFactory.setComponent(FieldTypes.NumberField, NumberField);
  defaultFieldFactory.setComponent(FieldTypes.Checkbox, Checkbox);
  defaultFieldFactory.setComponent(FieldTypes.Telephone, Telephone);
  defaultFieldFactory.setComponent(FieldTypes.FileUpload, FileUpload);

  defaultFieldFactory.setComponent(FieldTypes.DropdownList, DropdownList);
  defaultFieldFactory.setComponent(FieldTypes.CheckboxList, CheckboxList);
  defaultFieldFactory.setComponent(FieldTypes.ListBox, ListBox);
  defaultFieldFactory.setComponent(FieldTypes.RadioButtonList, RadioButtonList);

  defaultFieldFactory.setComponent(FieldTypes.Password, Password);

  return defaultFieldFactory;
}

export default createDefaultFieldFactory();
