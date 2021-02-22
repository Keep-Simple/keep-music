import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Msg, Player } from '../../state/player/actionTypes'
import { useAudioPlayer, usePlayerDispatch } from '../../state/player/context'
import { Icons } from '../ui/Icons'

export const LeftControls: FC<WrapProps> = (props) => {
    const dispatch = usePlayerDispatch()
    const { togglePlay, paused, loading } = useAudioPlayer()

    const iconProps = {
        onClick: () => togglePlay(),
        boxSize: '40px',
    }

    const MainIcon = () => {
        if (loading)
            return (
                <Icons.Loading
                    boxSize="40px"
                    thickness="4px"
                    color="gray.500"
                />
            )
        return paused ? (
            <Icons.Play {...iconProps} />
        ) : (
            <Icons.Pause {...iconProps} />
        )
    }

    return (
        <Wrap spacing={2} align="center" {...props}>
            <WrapItem p={2} cursor="pointer">
                <Icons.PrevSong
                    onClick={() => dispatch(Msg(Player.PlayPrev))}
                />
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                <MainIcon />
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                <Icons.NextSong
                    onClick={() => dispatch(Msg(Player.PlayNext))}
                />
            </WrapItem>
        </Wrap>
    )
}
