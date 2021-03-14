import { Box, HStack, StackProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import {
    useAudioPlayer,
    usePlayerDispatch,
} from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { Icons } from '../ui/Icons'

type Props = StackProps & { isDesktopView?: boolean }

export const LeftControls: FC<Props> = ({ isDesktopView, ...props }) => {
    const dispatch = usePlayerDispatch()
    const { togglePlay, paused, loading } = useAudioPlayer()

    const wrapperProps = {
        p: isDesktopView ? 2 : 0,
        cursor: 'pointer',
    }

    const PlayPauseIcon = () => {
        if (loading)
            return (
                <Icons.Loading
                    boxSize="40px"
                    thickness="3px"
                    color="gray.500"
                />
            )

        return paused ? (
            <Icons.Play boxSize="40px" />
        ) : (
            <Icons.Pause boxSize="40px" />
        )
    }

    return (
        <HStack spacing={2} align="center" {...props}>
            <Box {...wrapperProps}>
                <a
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(Msg(Player.PlayPrev))
                    }}
                >
                    <Icons.PrevSong />
                </a>
            </Box>
            <Box {...wrapperProps}>
                <a
                    onClick={(e) => {
                        e.stopPropagation()
                        togglePlay()
                    }}
                >
                    <PlayPauseIcon />
                </a>
            </Box>
            <Box {...wrapperProps}>
                <a
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(Msg(Player.PlayNext))
                    }}
                >
                    <Icons.NextSong />
                </a>
            </Box>
        </HStack>
    )
}
