import {
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import { useHover } from '../../utils/hooks/useHover'
import { Icons } from './Icon'

export const VolumeControl = () => {
    const { volume, mute } = useAudioPlayer()
    const [ref, isHover] = useHover()
    const [muted, setMuted] = useState(false)

    useEffect(() => {
        mute(muted)
    }, [muted, mute])

    const iconProps = {
        ml: 5,
        cursor: 'pointer',
        onClick: () => setMuted(!muted),
    }

    return (
        <Flex ref={ref}>
            <Slider
                aria-label="volume-slider"
                max={1}
                min={0}
                opacity={isHover ? 1 : 0}
                transition=".1s ease"
                w="68px"
                step={0.01}
                onChange={volume}
            >
                <SliderTrack bg="gray.500" h="2px">
                    <SliderFilledTrack bg="white" />
                </SliderTrack>
                <SliderThumb boxSize={3} />
            </Slider>

            {muted ? (
                <Icons.MutedSound {...iconProps} />
            ) : (
                <Icons.Sound {...iconProps} />
            )}
        </Flex>
    )
}
