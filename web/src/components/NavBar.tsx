import { useApolloClient } from '@apollo/client'
import {
    Circle,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spinner,
    Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
// import { ReactComponent as Logo } from '../../static/logo.svg'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { Msg, Player } from '../state/player/actionTypes'
import { usePlayer } from '../state/player/contextHooks'
import { StyledLink } from './ui/StyledLink'

export const NavBar: React.FC = () => {
    const { data, loading } = useMeQuery()
    const apolloClient = useApolloClient()
    const [logout] = useLogoutMutation()
    const [dispatch, { showPanel }] = usePlayer()

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
            <Menu>
                <Circle bg="gray.600" size="43px">
                    <MenuButton
                        as={Text}
                        px={4}
                        py={2}
                        borderRadius="sm"
                        transition="all 0.2s"
                        fontWeight="600"
                        cursor="pointer"
                        userSelect="none"
                    >
                        {data.me.username.charAt(0)}
                    </MenuButton>
                </Circle>
                <MenuList>
                    <NextLink href="/">
                        <MenuItem>Home Page</MenuItem>
                    </NextLink>
                    <NextLink href="/album/create">
                        <MenuItem>Add Album</MenuItem>
                    </NextLink>
                    <NextLink href="/author/create">
                        <MenuItem>Create Author</MenuItem>
                    </NextLink>
                    <MenuDivider />
                    <MenuItem
                        onClick={async () => {
                            await logout()
                            await apolloClient.resetStore()
                        }}
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }
    return (
        <Flex
            p={3}
            mb={4}
            bg="gray.800"
            justifyContent="center"
            position="sticky"
            zIndex={10}
            onClick={() => showPanel && dispatch(Msg(Player.TogglePanel))}
        >
            <Flex flex={1} justifyContent="space-between">
                <StyledLink href="/">
                    <Heading>keep-music</Heading>
                    {/* <Logo /> */}
                    {/* <Image src={logoSrc} boxSize="70px" /> */}
                </StyledLink>
                <Flex alignItems="center">{body}</Flex>
            </Flex>
        </Flex>
    )
}
