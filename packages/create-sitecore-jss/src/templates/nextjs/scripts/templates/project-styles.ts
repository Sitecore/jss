import { Project } from './component-factory';

export const generateProjectStyles = (projects: Project[]): string => {
  return `const Styles = new Map();

${projects
  .map(
    p =>
      `Styles.set('${p.projectName}', () => import('../projects/${p.projectName}/assets/index.scss'));`
  )
  .join('\n')}`;
};
