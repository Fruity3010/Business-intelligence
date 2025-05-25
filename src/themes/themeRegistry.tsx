
'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from './theme'; 


export default function ThemeRegistry(props: { children: React.ReactNode }) {
  const { children } = props;

  const [emotionCache] = React.useState(() => {
    const cache = createCache({ key: 'mui' });
    cache.compat = true; 
    return cache;
  });


  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${emotionCache.key} ${Object.keys(emotionCache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(emotionCache.inserted).join(' '),
        }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
      
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}