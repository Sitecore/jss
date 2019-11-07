import Welcome from './components/Welcome';
import StyleguideFieldUsageText from './components/Styleguide-FieldUsage-Text'
import StyleguideFieldUsageRichText from './components/Styleguide-FieldUsage-RichText';
import StyleguideFieldUsageImage from './components/Styleguide-FieldUsage-Image';
import StyleguideFieldUsageNumber from './components/Styleguide-FieldUsage-Number';
import StyleguideFieldUsageCheckbox from './components/Styleguide-FieldUsage-Checkbox';
import StyleguideFieldUsageDate from './components/Styleguide-FIeldUsage-Date';
import StyleguideFieldUsageLink from './components/Styleguide-FieldUsage-Link';
import StyleguideFieldUsageItemLink from './components/Styleguide-FieldUsage-ItemLink';

const components = new Map();

components.set('Styleguide-FieldUsage-Text', StyleguideFieldUsageText)
components.set('Styleguide-FieldUsage-RichText', StyleguideFieldUsageRichText)
components.set('Styleguide-FieldUsage-Image', StyleguideFieldUsageImage)
components.set('Styleguide-FieldUsage-Number', StyleguideFieldUsageNumber)
components.set('Styleguide-FieldUsage-Checkbox', StyleguideFieldUsageCheckbox)
components.set('Styleguide-FieldUsage-Date', StyleguideFieldUsageDate)
components.set('Styleguide-FieldUsage-Link', StyleguideFieldUsageLink)
components.set('Styleguide-FieldUsage-ItemLink', StyleguideFieldUsageItemLink)
components.set('Welcome', Welcome);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
