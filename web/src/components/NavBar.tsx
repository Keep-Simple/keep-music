import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/core'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { NextChakraLink } from './NextChakraLink'
import { useApolloClient } from '@apollo/client'

export const NavBar: React.FC = () => {
    const { data, loading } = useMeQuery()
    const apolloClient = useApolloClient()
    const [logout, { loading: logoutFetching }] = useLogoutMutation()

    let body

    if (loading) {
        body = <Spinner />
    } else if (!data?.me) {
        body = (
            <>
                <NextChakraLink href="/login" mr={2}>
                    Sign In
                </NextChakraLink>
                <NextChakraLink href="/register" mr={2}>
                    Sign Up
                </NextChakraLink>
            </>
        )
    } else {
        body = (
            <>
                <Box mr={2}>{data.me.username}</Box>
                <Button
                    onClick={async () => {
                        await logout()
                        await apolloClient.resetStore()
                    }}
                    isLoading={logoutFetching}
                    variant="link"
                >
                    Logout
                </Button>
            </>
        )
    }
    return (
        <Flex
            p={4}
            bg="purple.200"
            justifyContent="center"
            position="sticky"
            zIndex={10}
        >
            <Flex flex={1} maxW={800} justifyContent="space-between">
                <NextChakraLink href="/">
                    <Heading>keep-music</Heading>
                </NextChakraLink>
                <Flex alignItems="center">{body}</Flex>
            </Flex>
        </Flex>
    )
}
