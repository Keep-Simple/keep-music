import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import { Msg, Player } from '../../state/player/actionTypes'
import { usePlayerDispatch } from '../../state/player/context'
import { Icons } from './Icon'

export const LeftControls: FC<WrapProps> = (props) => {
    const dispatch = usePlayerDispatch()
    const { togglePlayPause, playing, ready } = useAudioPlayer()

    const playPauseProps = {
        onClick: () => ready && togglePlayPause(),
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
                {playing ? (
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
