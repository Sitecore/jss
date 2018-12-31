import React from 'react';

function Text({ field }) {
  const Tag = field.model.htmlTag || 'p';

  return <Tag className={field.model.cssClass}>{field.model.text}</Tag>;
}

export default Text;
