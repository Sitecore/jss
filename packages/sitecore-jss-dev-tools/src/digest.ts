import { createHash, createHmac } from 'crypto';
import { createReadStream } from 'fs';

export function digest(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');

    createReadStream(path)
      .pipe(hash.setEncoding('base64'))
      .on('error', (err: unknown) => reject(err))
      .on('finish', () => resolve(hash.read() as string));
  });
}

export function hmac(factors: string[], secret: string) {
  const mac = createHmac('sha256', secret);
  mac.setEncoding('base64');
  mac.write(factors.map((factor) => factor.toLowerCase()).join('|'));
  mac.end();
  return mac.read();
}
