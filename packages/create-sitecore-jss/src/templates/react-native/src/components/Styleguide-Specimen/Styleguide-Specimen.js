import React from 'react';
import { View, Text as NText } from 'react-native';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react-native';

import styles from './styles';

const StyleguideSpecimen = ({ fields, children, rendering }) => (
  <View style={styles.wrapper}>
    <Text style={styles.heading} field={fields.heading} />
    <RichText field={fields.description} />

    <NText style={styles.section}>
      Implementation:{' '}
      <NText style={styles.filepath}>/src/components/{rendering.componentName}/index.js</NText>
    </NText>
    <NText style={styles.section}>
      Definition:{' '}
      <NText style={styles.filepath}>
        /sitecore/definitions/components/{rendering.componentName}.sitecore.js
      </NText>
    </NText>

    <View style={styles.example}>{children}</View>
  </View>
);

export default StyleguideSpecimen;
