import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

export interface MissingComponentProps {
  rendering?: {
    componentName?: string;
  } | null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkorange',
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
  },
  text: {
    color: 'white',
    marginVertical: 20,
  },
});

export const MissingComponent: React.SFC<MissingComponentProps> = (props) => {
  const componentName =
    props.rendering && props.rendering.componentName
      ? props.rendering.componentName
      : 'Unnamed Component';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{componentName}</Text>
      <Text style={styles.text}>JSS component is missing React Native implementation.</Text>
    </View>
  );
};

MissingComponent.propTypes = {
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

MissingComponent.displayName = 'MissingComponent';
