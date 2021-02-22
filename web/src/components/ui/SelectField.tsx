import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    useTheme,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'
import AsyncSelect from 'react-select/async'

type SelectFieldProps = {
    name: string
    label: string
    loadOptions: (v: string) => Promise<any>
    placeholder?: string
    isRequired?: boolean
}

export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    isRequired = true,
    loadOptions,
    ...props
}) => {
    const [field, { error }, { setValue }] = useField(props)
    const chakraTheme = useTheme()

    return (
        <FormControl isInvalid={!!error} isRequired={isRequired}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Box color="white">
                <AsyncSelect
                    loadOptions={loadOptions}
                    cacheOptions
                    name={field.name}
                    onChange={(option) => setValue(option?.value)}
                    instanceId={field.name}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary: chakraTheme.colors.blue['300'],
                            primary25: chakraTheme.colors.gray['700'],
                            primary50: chakraTheme.colors.gray['700'],
                            primary75: chakraTheme.colors.gray['700'],
                            neutral0: chakraTheme.colors.gray['800'],
                            neutral5: chakraTheme.colors.gray['800'],
                            neutral20: chakraTheme.colors.gray['700'],
                            neutral80: chakraTheme.colors.gray['100'],
                        },
                    })}
                />
            </Box>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}
