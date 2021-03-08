import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import { WithStyles } from '@material-ui/core';
import { styles } from 'styles/stylesConstant';


interface CustomSwitchProps extends WithStyles<typeof styles.customSwitch> {
  disabled?: boolean;
  checked: boolean;
  handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  classes,
  handleChange,
  disabled,
  checked,
}) => {
  return (
    <Switch
      checked={checked}
      disabled={disabled}
      classes={{
        switchBase: classes.colorSwitchBase,
        checked: classes.colorChecked,
        // bar: classes.colorBar,
        disabled: classes.colorDisabled,
      }}
      onChange={handleChange}
    />
  );
};


export default withStyles(styles.customSwitch)(CustomSwitch);
