// components/user/Container.js
import React from 'react';
import { useNode } from '@craftjs/core';
import { Flex as FlexAntd } from 'antd';

export const FlexContainer = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <FlexAntd
      gap={32}
      align="center"
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
    >
      {children}
    </FlexAntd>
  );
};
