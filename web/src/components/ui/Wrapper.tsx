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
            mb="200px"
            mx="auto"
            direction="column"
            {...props}
        />
    )
}
