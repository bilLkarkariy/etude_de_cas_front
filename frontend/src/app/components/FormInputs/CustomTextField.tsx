import * as React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles,  WithStyles } from '@material-ui/core/styles';
import { styles } from 'styles/stylesConstant';

interface CustomTextFieldProps extends WithStyles<typeof styles> {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    style?: { [key: string]: React.CSSProperties }
    required?: boolean
    multiline?: boolean
    rows?: number
    rowsMax?: number
    adornment?: React.ReactNode
    disabled?: boolean
    defaultValue?: number | string
    value?: number | string | undefined
    start_adornment?: React.ReactNode
    error?: boolean
    errorMessage?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    changeOnBlur?: boolean
    placeholder?: string
    id?: string
    type?: string
    width?: number | string
    children?: React.ReactNode
    disableUnderline?: boolean
    autoFocus?: boolean
    inputRef?: React.RefObject<HTMLInputElement>
}

const CustomTextField = ({
    inputProps,
    style = {
        container: {
            margin: 15
        },
        input: {
            fontSize: 14,
            marginTop: 16
        }
    },
    required = false,
    multiline = false,
    rows = 1,
    rowsMax = 1,
    adornment = '',
    disabled = false,
    value = '',
    errorMessage,
    start_adornment = '',
    error = false,
    handleChange,
    changeOnBlur = true,
    placeholder,
    id,
    type = 'text',
    width,
    children,
    disableUnderline = false,
    autoFocus = false,
    inputRef,
    classes
}: CustomTextFieldProps) =>
    <FormControl style={{ marginRight: 10, width: width, ...style.container }}>
        <InputLabel
            shrink={true}
            style={{ fontSize: 18, whiteSpace: 'nowrap' }}
            error={error}>
            {children}
        </InputLabel>

        <Input
            inputRef={inputRef}
            autoFocus={autoFocus}
            disableUnderline={disableUnderline}
            classes={{ disabled: classes.disabled }}
            style={{ ...style.input }}
            id={id}
            type={type}
            value={value}
            required={required}
            margin={undefined}
            placeholder={placeholder}
            startAdornment={start_adornment && (
                <InputAdornment position='start' style={{ fontSize: 20 }}>
                    {start_adornment}
                </InputAdornment>
            )}
            endAdornment={
                <InputAdornment position='end' style={{ fontSize: 20 }}>
                    {adornment}
                </InputAdornment>
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: any)=> {
                    if (changeOnBlur) {
                        e.target.value = type === 'text' ? e.target.value.toString().trim() : e.target.value;
                        handleChange(e);
                    }
                }}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            rowsMax={rowsMax}
            error={error}
            inputProps={inputProps}
        />
        {error && errorMessage && (
            <FormHelperText error style={{ fontSize: 12, fontWeight: 400 }}>
                {errorMessage}
            </FormHelperText>
        )}
    </FormControl>
;

export default withStyles(styles)(CustomTextField);
