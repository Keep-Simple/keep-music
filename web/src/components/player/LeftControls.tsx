import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import {
    useAudioPlayer,
    usePlayerDispatch,
} from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { Icons } from '../ui/Icons'

export const LeftControls: FC<WrapProps> = (props) => {
    const dispatch = usePlayerDispatch()
    const { togglePlay, paused, loading } = useAudioPlayer()

    const wrapperProps = {
        p: 2,
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
        <Wrap spacing={2} align="center" {...props}>
            <WrapItem {...wrapperProps}>
                <a
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(Msg(Player.PlayPrev))
                    }}
                >
                    <Icons.PrevSong />
                </a>
            </WrapItem>
            <WrapItem {...wrapperProps}>
                <a
                    onClick={(e) => {
                        e.stopPropagation()
                        togglePlay()
                    }}
                >
                    <PlayPauseIcon />
                </a>
            </WrapItem>
            <WrapItem {...wrapperProps}>
                <a
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(Msg(Player.PlayNext))
                    }}
                >
                    <Icons.NextSong />
                </a>
            </WrapItem>
        </Wrap>
    )
}
