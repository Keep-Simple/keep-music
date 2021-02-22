import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
    placeholder?: string
    textarea?: boolean
    isRequired?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    isRequired = true,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props)
    let TextField: any = textarea ? Textarea : Input

    return (
        <FormControl isInvalid={!!error} isRequired={isRequired}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <TextField {...field} {...props} variant="flushed" />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}
