import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: null,
  },
  logoImage: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  styleguideLink: {
    marginVertical: 15,
    color: '#1191db',
    fontSize: 18,
  },
  body: {
    flex: 1,
    margin: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
    marginVertical: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export const richTextStyles = StyleSheet.create({
  p: {
    fontSize: 17,
    marginBottom: 10,
  },
});
