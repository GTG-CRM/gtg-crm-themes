// components/user/Button.js
import React from 'react';
import { Button as AntdButton } from 'antd';
import { useNode } from '@craftjs/core';

export const Button = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <AntdButton
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
    >
      {children}
    </AntdButton>
  );
};
