import {
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react'
import React from 'react'
import {
    useAudioPlayer,
    useAudioPosition,
} from '../../state/player/contextsHooks'
import { useHover } from '../../utils/hooks/useHover'
import { Icons } from '../ui/Icons'

export const VolumeControl = () => {
    const { toggleMute, setVolume, muted } = useAudioPlayer()
    const { volume } = useAudioPosition()
    const { hovered, bind } = useHover()

    const iconProps = {
        ml: 5,
        cursor: 'pointer',
    }

    return (
        <Flex {...bind}>
            <Slider
                aria-label="volume-slider"
                focusThumbOnChange={false}
                max={1}
                min={0}
                value={!muted ? volume : 0}
                opacity={hovered ? 1 : 0}
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

            <a onClick={() => toggleMute()}>
                {muted ? (
                    <Icons.MutedSound {...iconProps} />
                ) : (
                    <Icons.Sound {...iconProps} />
                )}
            </a>
        </Flex>
    )
}
