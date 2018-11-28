import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

export interface UnrenderableComponentProps {
  rendering?: {
    name?: string;
  } | null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'firebrick',
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

export const UnrenderableComponent: React.SFC<UnrenderableComponentProps> = (props) => {
  const componentName =
    props.rendering && props.rendering.name ? props.rendering.name : 'Unnamed Component';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{componentName}</Text>
      <Text style={styles.text}>Component can't be rendered in React Native.</Text>
    </View>
  );
};

UnrenderableComponent.propTypes = {
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

UnrenderableComponent.displayName = 'UnrenderableComponent';
