import { Flex, Spinner } from '@chakra-ui/react'

export const Loading: React.FC<{}> = () => {
    return (
        <Flex m="auto">
            <Spinner
                m="auto"
                size="xl"
                color="teal.500"
                emptyColor="gray.200"
            />
        </Flex>
    )
}
