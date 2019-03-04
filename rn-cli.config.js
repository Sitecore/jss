module.exports = {
  getBlacklistRE: () =>
    new RegExp(
      /.*(\\|\/)samples(\\|\/)react-native(\\|\/)node_modules(\\|\/)react-native(\\|\/).*/
    ),
};
