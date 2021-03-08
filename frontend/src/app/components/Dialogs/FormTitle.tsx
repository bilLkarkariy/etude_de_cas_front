import * as React from 'react'

import CustomTextField from '../FormInputs/CustomTextField'

interface FormTitleProps {
    handleChangeFormTitle: (value: string) => void
    handleSettingNameValidation?: (value: string) => string | undefined
    title?: string
    placeholder?: string
    disabled?: boolean
}

const FormTitle = ({
    handleChangeFormTitle,
    handleSettingNameValidation,
    title = undefined,
    placeholder = 'Settings Name',
    disabled = false
}: FormTitleProps) => {
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined)

    const customStyle = {
        container: {
            margin: 0,
        },
        input: {
            fontSize: 20,
            marginTop: 0,
        }
    }

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        handleSettingNameValidation && setErrorMessage(handleSettingNameValidation(value))
        handleChangeFormTitle(value)
    }

    return (
        <div style={{ height: 40, width: 300 }}>
            <CustomTextField
                id='name'
                value={title}
                placeholder={placeholder}
                handleChange={handleChange}
                style={customStyle}
                type='text'
                width={'100%'}
                error={Boolean(errorMessage)}
                errorMessage={errorMessage}
                required={true}
                disabled={disabled}
            >
            </CustomTextField>
        </div>
    )
}

export default FormTitle;
