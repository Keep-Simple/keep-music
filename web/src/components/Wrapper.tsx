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
            maxW={variant === 'regular' ? '100%' : '400px'}
            mt={8}
            px="6vw"
            mx="auto"
            direction="column"
            justifyContent="center"
            {...props}
        />
    )
}
