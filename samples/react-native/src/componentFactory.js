import Welcome from './components/Welcome';
import StyleguideFieldUsageText from './components/Styleguide-FieldUsage-Text'
import StyleguideFieldUsageRichText from './components/Styleguide-FieldUsage-RichText';
import StyleguideFieldUsageImage from './components/Styleguide-FieldUsage-Image';
import StyleguideFieldUsageNumber from './components/Styleguide-FieldUsage-Number';
import StyleguideFieldUsageCheckbox from './components/Styleguide-FieldUsage-Checkbox';
import StyleguideFieldUsageDate from './components/Styleguide-FIeldUsage-Date';
import StyleguideFieldUsageLink from './components/Styleguide-FieldUsage-Link';
import StyleguideFieldUsageCustom from './components/Styleguide-FieldUsage-Custom';
import StyleguideLayoutTabs from './components/Styleguide-Layout-Tabs';
import StyleguideLayoutTabsTab from './components/Styleguide-Layout-Tabs-Tab';
import StyleguideComponentParams from './components/Styleguide-ComponentParams';

const components = new Map();

components.set('Styleguide-FieldUsage-Text', StyleguideFieldUsageText)
components.set('Styleguide-FieldUsage-RichText', StyleguideFieldUsageRichText)
components.set('Styleguide-FieldUsage-Image', StyleguideFieldUsageImage)
components.set('Styleguide-FieldUsage-Number', StyleguideFieldUsageNumber)
components.set('Styleguide-FieldUsage-Checkbox', StyleguideFieldUsageCheckbox)
components.set('Styleguide-FieldUsage-Date', StyleguideFieldUsageDate)
components.set('Styleguide-FieldUsage-Link', StyleguideFieldUsageLink)
components.set('Styleguide-FieldUsage-Custom', StyleguideFieldUsageCustom)
components.set('Styleguide-Layout-Tabs', StyleguideLayoutTabs)
components.set('Styleguide-Layout-Tabs-Tab', StyleguideLayoutTabsTab)
components.set('Styleguide-ComponentParams', StyleguideComponentParams)
components.set('Welcome', Welcome);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
