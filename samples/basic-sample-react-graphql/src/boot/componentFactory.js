import ConnectedPage from "../app/components/ConnectedPage";
import IntegratedPage from "../app/components/IntegratedPage";
import Chat from "../app/components/Chat";

const components = new Map();
components.set("IntegratedPage", IntegratedPage);
components.set("ConnectedPage", ConnectedPage);
components.set("Chat", Chat);

const componentFactory = componentName => {
  return components.get(componentName);
};

export default componentFactory;
