
'use client';

import React, { useState, useEffect } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface AnimatedBoxProps extends BoxProps {
  children?: React.ReactNode;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ children, className, ...props }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      className={`
        ${className || ''} 
        transition-all duration-200 ease-out 
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedBox;