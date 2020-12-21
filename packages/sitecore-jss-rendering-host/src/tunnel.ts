import ngrok, { INgrokOptions } from 'ngrok';

export interface TunnelOptions extends INgrokOptions {
  port?: number;
  quiet?: boolean;
}

export function startRenderHostTunnel(
  renderHostname: string,
  options: INgrokOptions = { port: 80, proto: 'http', quiet: false }
) {
  if (!renderHostname) {
    throw new Error(
      'Unable to start render host tunnel as no hostname for the rendering host was specified.'
    );
  }

  const rewriteHost = `${renderHostname}:${options.port}`;
  const finalOptions = {
    ...options,
    host_header: 'rewrite',
    addr: rewriteHost,
  };

  return ngrok.connect(finalOptions).then((url: string) => {
    if (!options.quiet) {
      console.log(`Tunnel started, forwarding '${url}' to '${rewriteHost}'`);
    }
    return url;
  });
}
