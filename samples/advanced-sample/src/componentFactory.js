import HomeContainer from 'home/components/HomeContainer';
import AboutContainer from 'about/components/AboutContainer';
import ServicesContainer from 'services/components/ServicesContainer';
import * as UI from 'ui/components';
import PortfolioContainer from 'portfolio/components/PortfolioContainer';
import ServiceList from 'services/components/ServiceList';


const components = new Map();
components.set('Home', HomeContainer);
components.set('About', AboutContainer);
components.set('Services', ServicesContainer);
components.set('Heading', UI.Heading);
components.set('RichText', UI.RichText);
components.set('LinkButton', UI.LinkButton);
components.set('FileLink', UI.FileLink);
components.set('Portfolio', PortfolioContainer);
components.set('Carousel', UI.Carousel);
components.set('TwoColumn', UI.TwoColumn);
components.set('Tabs', UI.Tabs);
components.set('Tab', UI.Tab);
components.set('FormContent', UI.FormContent);
components.set('Jumbotron', UI.Jumbotron);
components.set('DownloadCallout', UI.DownloadCalloutContainer);
components.set('ServiceList', ServiceList);

export default componentName => components.get(componentName);
