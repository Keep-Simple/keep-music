import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { StyledLink } from './StyledLink'
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
                <StyledLink href="/login" mr={2}>
                    Sign In
                </StyledLink>
                <StyledLink href="/register" mr={2}>
                    Sign Up
                </StyledLink>
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
            bg="gray.800"
            justifyContent="center"
            position="sticky"
            zIndex={10}
        >
            <Flex flex={1} px={5} justifyContent="space-between">
                <StyledLink href="/">
                    <Heading>keep-music</Heading>
                </StyledLink>
                <Flex alignItems="center">{body}</Flex>
            </Flex>
        </Flex>
    )
}
