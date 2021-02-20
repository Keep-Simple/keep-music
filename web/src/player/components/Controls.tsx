import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import { Icons } from './Icon'

export const Controls: FC<WrapProps> = (props) => {
    const { togglePlayPause, playing, ready } = useAudioPlayer()

    const playPauseProps = {
        onClick: () => ready && togglePlayPause(),
        boxSize: '40px',
    }

    return (
        <Wrap spacing={2} align="center" {...props}>
            <WrapItem p={2} cursor="pointer">
                <Icons.PrevSong />
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                {playing ? (
                    <Icons.Pause {...playPauseProps} />
                ) : (
                    <Icons.Play {...playPauseProps} />
                )}
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                <Icons.NextSong />
            </WrapItem>
        </Wrap>
    )
}
