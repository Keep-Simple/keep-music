import { useApolloClient } from '@apollo/client'
import {
    Box,
    Circle,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spinner,
    Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useWindowScroll } from 'react-use'
import { Icons } from '../components/ui/Icons'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { Msg, Player } from '../state/player/actionTypes'
import { usePlayer } from '../state/player/contextHooks'
import { StyledLink } from './ui/StyledLink'

export const NavBar: React.FC = () => {
    const { data, loading } = useMeQuery()
    const apolloClient = useApolloClient()
    const [logout] = useLogoutMutation()
    const [dispatch, { showPanel }] = usePlayer()

    const { y } = useWindowScroll()

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
            <Menu placement="top-start">
                <Circle bg="blue.600" size="43px">
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
                <MenuList
                    borderWidth={0}
                    transition="none"
                    transform="none"
                    _groupHover={{ bg: 'gray.300' }}
                >
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
            justifyContent="center"
            position="fixed"
            top={0}
            left={0}
            right={0}
            transition=".2s ease-out"
            bg={y > 74 || showPanel ? 'black' : 'transparent'}
            borderBottomColor={
                y > 74 && !showPanel ? 'whiteAlpha.100' : 'transparent'
            }
            borderBottomWidth="1px"
            zIndex={999}
            onClick={() => showPanel && dispatch(Msg(Player.TogglePanel))}
        >
            <Flex flex={1} justifyContent="space-between">
                <StyledLink href="/">
                    <Box cursor="pointer">
                        <Icons.AppLogo />
                    </Box>
                </StyledLink>
                <Flex alignItems="center">{body}</Flex>
            </Flex>
        </Flex>
    )
}
