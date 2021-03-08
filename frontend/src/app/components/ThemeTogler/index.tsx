import { Button } from '@material-ui/core';
import useDarkMode from 'app/hooks/useDarkMode';
import React from 'react';

const ThemeToggler: React.FC = () => {
     const [mode, setMode] = useDarkMode();

     const handleClick = () => {
          setMode(mode === 'dark' ? 'light' : 'dark');
     };

     return (
          <Button
               id="themeToggler"
               name="themeSwitch"
               type="button"
               onClick={() => {
                    handleClick();
               }}
          >
               {mode === 'dark' ? 'light' : 'dark'}
          </Button>
     );
};

export default ThemeToggler;
