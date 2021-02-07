import { Flex } from '@chakra-ui/react'

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
    variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
    variant = 'regular',
    ...props
}) => {
    return (
        <Flex
            maxW={variant === 'regular' ? '800px' : '400px'}
            mt={8}
            mx="auto"
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            {...props}
        />
    )
}
