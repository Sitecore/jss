import { environment } from '../src/environments/environment';
import { cpSync, rmSync } from 'fs';

// Executed at the end of the build process (jss build) to move the build output to the proxy build path

try {
  console.log('Moving build output to proxy build path:', environment.proxyBuildPath);

  rmSync(environment.proxyBuildPath, { recursive: true, force: true });
  cpSync('./dist', environment.proxyBuildPath, { recursive: true });

  console.log('Proxy build prepared successfully!');
} catch (error) {
  console.error('Error preparing proxy build:', error);
}
