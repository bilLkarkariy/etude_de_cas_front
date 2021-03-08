import React from 'react';

type DarkModeState = 'dark' | 'light';

const useDarkMode = () => {
  const [mode, setMode] = React.useState<DarkModeState>(() => {
    const localStorageValue = window.localStorage.getItem('colorMode');
    if (localStorageValue) {
      return localStorageValue === 'dark' ? 'dark' : 'light';
    }

    const modePrefs = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

    return modePrefs;
  });

  React.useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(mode);
  }, [mode]);

  return [mode, setMode] as const;
};

export default useDarkMode;
