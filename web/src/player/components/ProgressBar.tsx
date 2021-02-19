import {
    Box,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react'
import { useEffect, useLayoutEffect, useState } from 'react'
import { MdGraphicEq } from 'react-icons/md'
import { useAudioPosition } from 'react-use-audio-player'

export const ProgressBar = () => {
    const { percentComplete, duration, seek, position } = useAudioPosition({
        highRefreshRate: true,
    })
    const [_position, _setPosition] = useState(0)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        if (dragging) return

        const id = setTimeout(() => seek(_position), 100)
        return () => clearTimeout(id)
    }, [dragging])

    useLayoutEffect(() => {
        if (dragging) return

        _setPosition(position)
    }, [position])

    return (
        <Slider
            aria-label="slider-ex-4"
            value={_position}
            max={duration}
            onChangeStart={(value) => {
                setDragging(true)
                _setPosition(value)
            }}
            onChangeEnd={(value) => {
                setDragging(false)
                _setPosition(value)
            }}
            onChange={(value) => {
                _setPosition(value)
            }}
        >
            <SliderTrack bg="#FFFFFF1A" h="2px">
                <SliderFilledTrack bg="#FF0000" zIndex={1} />
                <Box
                    bg="#909090"
                    w={`${percentComplete}%`}
                    h="2px"
                    pos="relative"
                />
            </SliderTrack>
            <SliderThumb boxSize={6}>
                <Box color="tomato" as={MdGraphicEq} />
            </SliderThumb>
        </Slider>
    )
}
