import { StyleSheet } from 'react-native';

const tabCommonStyles = {
  borderWidth: 1,
  padding: 10,
  top: 1,
};

export default StyleSheet.create({
  tabs: {
    flexDirection: 'row',
  },
  content: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
    padding: 15,
    paddingBottom: 15,
  },
  tabTitle: {
    color: '#007bff',
    borderColor: '#fff',
    ...tabCommonStyles,
  },
  tabTitleActive: {
    color: '#007bff',
    borderColor: '#dee2e6',
    borderBottomColor: '#fff',
    zIndex: 1,
    ...tabCommonStyles,
  },
});
