import React from 'react';

const styles = {
  height: '100px',
  backgroundImage:
    'linear-gradient(45deg, #ffffff 25%, #dcdcdc 25%, #dcdcdc 50%, #ffffff 50%, #ffffff 75%, #dcdcdc 75%, #dcdcdc 100%)',
  backgroundSize: '3px 3px',
};

export const HiddenRendering = () => <div style={styles} />;
