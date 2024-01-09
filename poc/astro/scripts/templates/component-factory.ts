/**
 * Describes a file that represents a component definition
 */
export interface ComponentFile {
  path: string;
  moduleName: string;
  componentName: string;
}

/**
 * Generates the contents of the component factory file using a predefined string template.
 * @param components - the list of component files to include
 * @returns component factory file contents
 */
function generateComponentFactory(components: (ComponentFile)[]): string {
  const componentFiles = components.filter(
    (component) => (component as ComponentFile).path
  ) as ComponentFile[];

  return `---
  
${componentFiles.map((component) => {
    return `import ${component.moduleName} from '${component.path}'`;
  }).join('\n')}

export interface Props  {
  name: string;
  route: any;
}
---

<>
${componentFiles.map(
    (component) => `{Astro.props.name === '${component.componentName}' && <${component.moduleName} route={Astro.props.route}/>}`
  ).join('\n')}
  {Astro.props.name === undefined && Astro.props.route.name === 'code' && <code {...Astro.props.route.attributes} set:html={Astro.props.route.contents}></code>}
</>
`;
}

export default generateComponentFactory;
