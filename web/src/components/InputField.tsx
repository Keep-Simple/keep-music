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
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props)
    let TextField: any = textarea ? Textarea : Input

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <TextField {...field} {...props} />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}
