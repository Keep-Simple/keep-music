import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Icons } from '../Icons'
import { VolumeControl } from './VolumeControl'

export const RightControls: FC<WrapProps> = (props) => {
    // const { togglePlayPause, playing, ready } = useAudioPlayer()

    return (
        <Wrap
            spacing={2}
            align="center"
            justify="flex-end"
            color="gray.500"
            mr={3}
            {...props}
        >
            <WrapItem p={2} cursor="pointer">
                <VolumeControl />
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                <Icons.Loop />
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                <Icons.Shuffle />
            </WrapItem>
            <WrapItem p={2} cursor="pointer">
                <Icons.TogglePager color="white" />
            </WrapItem>
        </Wrap>
    )
}
