import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Msg, Player } from '../../state/player/actionTypes'
import { useAudioPlayer, usePlayerDispatch } from '../../state/player/context'
import { Icons } from '../Icons'

export const LeftControls: FC<WrapProps> = (props) => {
    const dispatch = usePlayerDispatch()
    const { togglePlay, paused } = useAudioPlayer()

    const playPauseProps = {
        onClick: () => togglePlay(),
        boxSize: '40px',
    }

    return (
        <Wrap spacing={2} align="center" {...props}>
            <WrapItem p={2} cursor="pointer">
                <Icons.PrevSong
                    onClick={() => dispatch(Msg(Player.PlayPrev))}
                />
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                {!paused ? (
                    <Icons.Pause {...playPauseProps} />
                ) : (
                    <Icons.Play {...playPauseProps} />
                )}
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                <Icons.NextSong
                    onClick={() => dispatch(Msg(Player.PlayNext))}
                />
            </WrapItem>
        </Wrap>
    )
}
