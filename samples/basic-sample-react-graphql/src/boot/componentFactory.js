import ConnectedPage from '../app/components/ConnectedPage';
import IntegratedPage from '../app/components/IntegratedPage';
import Chat from '../app/components/Chat';
import PieChart from '../app/components/PieChart';

const components = new Map();
components.set('IntegratedPage', IntegratedPage);
components.set('ConnectedPage', ConnectedPage);
components.set('Chat', Chat);
components.set('PieChart', PieChart);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
