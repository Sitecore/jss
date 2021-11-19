import ngrok, { Ngrok } from 'ngrok';

export interface TunnelOptions extends Ngrok.Options {
  port?: number;
  quiet?: boolean;
}

/**
 * @param {string} renderHostname
 * @param {INgrokOptions} options
 */
export function startRenderHostTunnel(
  renderHostname: string,
  options: Ngrok.Options = { port: 80, proto: 'http', quiet: false }
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
