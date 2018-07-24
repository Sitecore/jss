import { serverRenderer as componentServerRenderer } from '../src/boot/componentServerRenderer';

export function catalogServerRenderer(renderingData, viewBag) {
  const { componentName } = renderingData.rendering;

  const componentMarkup = componentServerRenderer(renderingData, viewBag);

  return `
    <div class="sc-component-catalog-component-wrapper ${formatComponentName(componentName)}">
      <h4 class="sc-component-catalog-component-name">${componentName}</h4>
      ${componentMarkup}
    </div>`;
}

function formatComponentName(name) {
  return name.replace(' ', '-');
}
