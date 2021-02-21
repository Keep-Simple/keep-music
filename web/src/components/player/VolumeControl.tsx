import {
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react'
import React from 'react'
import { useAudioPlayer } from '../../state/player/context'
import { useHover } from '../../utils/hooks/useHover'
import { Icons } from '../Icons'

export const VolumeControl = () => {
    const { toggleMute, setVolume, muted, volume } = useAudioPlayer()
    const [ref, isHover] = useHover()

    const iconProps = {
        ml: 5,
        cursor: 'pointer',
        onClick: () => toggleMute,
    }

    return (
        <Flex ref={ref}>
            <Slider
                aria-label="volume-slider"
                max={1}
                min={0}
                defaultValue={volume}
                opacity={isHover ? 1 : 0}
                transition=".1s ease"
                w="68px"
                step={0.01}
                onChange={setVolume}
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
