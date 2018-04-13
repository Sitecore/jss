export const onComponentMounting = (componentName) => ({
  type: `${componentName}/COMPONENT_MOUNTING`,
});

export const onComponentMounted = (componentName) => ({
  type: `${componentName}/COMPONENT_MOUNTED`,
});
