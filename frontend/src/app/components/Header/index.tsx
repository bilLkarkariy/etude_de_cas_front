import { AppBar, IconButton } from '@material-ui/core';
import React from 'react';
import { Toolbar } from 'react-data-grid-addons';
import { Link } from 'react-router-dom';
import { StyleConstants } from 'styles/stylesConstant';
import ThemeToggler from '../ThemeTogler';

const Header: React.FC = ({ children }) => {
     return (
          <AppBar position="static">
               <Toolbar >
               <Link style={StyleConstants.link} to="/data-management">Data Management</Link>
               <Link style={StyleConstants.link} to="/">Settings</Link>
                    <IconButton
                         edge="start"
                        //  className={classes.menuButton}
                         color="inherit"
                         aria-label="menu"
                    >
                    <ThemeToggler />
                    </IconButton>
               </Toolbar>
          </AppBar>
     );
};

export default Header;
