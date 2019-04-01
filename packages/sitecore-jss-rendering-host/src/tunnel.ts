import ngrok, { INgrokOptions } from 'ngrok';

export interface TunnelOptions extends INgrokOptions {
  port?: number;
  quiet?: boolean;
}

export function startRenderHostTunnel(
  renderHostUrl: string,
  { port = 80, protocol = 'http', quiet = false }: INgrokOptions
) {
  if (!renderHostUrl) {
    throw new Error(
      'Unable to start render host tunnel as no URL for the rendering host was specified.'
    );
  }

  // be sure to strip the scheme/protocol from the host url, otherwise ngrok will make requests like 'http://http://jssbasicapp'.
  const hostWithoutProtocol = renderHostUrl.replace(`${protocol}://`, '');
  const rewriteHost = `${hostWithoutProtocol}:${port}`;

  return ngrok
    .connect({
      proto: protocol,
      host_header: 'rewrite',
      addr: rewriteHost,
    })
    .then((url: string) => {
      if (!quiet) {
        console.log(`Tunnel started, forwarding '${url}' to '${rewriteHost}'`);
      }
      return url;
    });
}
