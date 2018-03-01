import Welcome from "./components/Welcome";

const components = new Map();
components.set("Welcome", Welcome);

const componentFactory = componentName => {
  return components.get(componentName);
};

export default componentFactory;
