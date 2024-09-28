// components/user/Text.js
import React from 'react';
import { useNode } from '@craftjs/core';

export const Text = ({ text }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div ref={(ref) => ref && connect(drag(ref))}>
      <p>{text}</p>
    </div>
  );
};

Text.craft = {
  rules: {
    canDrag: (node) => node.data.props.text != 'Drag',
  },
};
