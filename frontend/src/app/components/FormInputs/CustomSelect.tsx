import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { styles } from 'styles/stylesConstant';


export type SelectOption = {
    value: any,
    label: string,
    description?: string
}

interface CustomSelectProps extends WithStyles<typeof styles> {
    id: string
    options: SelectOption[]
    children?: React.ReactNode
    disabled?: boolean
    required?: boolean
    multiple?: boolean
    width?: string | number
    value: any
    renderValue?: (value: any) => React.ReactNode
    handleChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void
    error?: {
        value: any,
        message: string
    }
    margin?: number
}

class CustomSelect extends React.Component<CustomSelectProps> {

    handleChange = (e: React.ChangeEvent<{ name?: string ; value: unknown }>) => {
        const { id } = this.props
        e.target.name = id;
        if (e.target.value === 'true' || e.target.value === 'false')
            e.target.value = e.target.value === 'true'
        this.props.handleChange(e)
    };

    render() {
        let {
            id,
            options,
            children,
            disabled = false,
            required,
            multiple = false,
            width,
            value = '',
            renderValue,
            error = {
                value: false,
                message: ''
            },
            margin = 15,
            classes
        } = this.props

        if (value === true || value === false)
            value = String(value)

        return (
            <FormControl 
                style={{
                    marginTop: margin,
                    marginLeft: margin,
                    marginRight: margin,
                    width: width
                }}
                disabled={disabled}
                error={error.value}
            >
                <InputLabel style={{ fontSize: 18 }} required={required}>
                    {children}
                </InputLabel>

                <Select
                    classes={{ disabled: classes.disabled }}
                    multiple={multiple}
                    style={{ fontSize: 14 }}
                    id={id}
                    disabled={disabled}
                    value={value}
                    onChange={(e) => this.handleChange(e)}
                    inputProps={{
                        name: id,
                        id: id,
                    }}
                    renderValue={renderValue}
                >
                    {options.map(option => {
                        let value = option.value
                        if (option.value === true || option.value === false)
                            value = String(option.value)
                        return (
                            <MenuItem 
                                style={{ height: 10, fontSize: 12 }}
                                key={value}
                                value={value}
                            >
                                {option.description ? (
                                    <Typography style={{ fontSize: 12, width: 1 }}>
                                        <b>
                                            {option.label}
                                        </b> 
                                        {' '}
                                        {option.description}
                                    </Typography>
                                ) : (
                                    option.label
                                )}
                            </MenuItem>
                        )
                      }
                    )}
                </Select>
                {error.value ? (
                    <FormHelperText style={{ fontSize: 12 }}>
                        {error.message}
                    </FormHelperText>
                ) : (
                    <div></div>
                )}
            </FormControl>
        )
    }
}

export default withStyles(styles)(CustomSelect)
