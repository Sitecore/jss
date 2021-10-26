import { Manifest } from './../../../index';

export default (manifest: Manifest) => {
  return Promise.resolve(manifest).then((manifest1) => {
    manifest1.addComponent({
      name: 'AsyncComponent',
      placeholders: [{ name: 'ph1' }],
    });
  });
};
