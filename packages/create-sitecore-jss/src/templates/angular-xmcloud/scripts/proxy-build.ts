import { execSync } from 'child_process';
import { environment } from '../src/environments/environment';

// Executed at the end of the build process (jss build) to move the build output to the proxy build path

try {
  console.log('Moving build output to proxy build path:', environment.proxyBuildPath);

  execSync(`del-cli ${environment.proxyBuildPath} --force`, { stdio: 'inherit' });
  execSync(`move-cli ./dist ${environment.proxyBuildPath}`, { stdio: 'inherit' });

  console.log('Proxy build prepared successfully!');
} catch (error) {
  console.error('Error preparing proxy build:', error);
}
