import {
    Box,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MdGraphicEq } from 'react-icons/md'
import { useAudioPosition } from 'react-use-audio-player'
import { useDraggingTime } from '../../state/player/context'
import { useTrackSongView } from './PlayerAnalytics'

export const ProgressBar = ({ loadProgress = 0 }) => {
    useTrackSongView()
    const { duration, seek, position } = useAudioPosition({
        highRefreshRate: true,
    })
    const [_position, _setPosition] = useDraggingTime()

    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        if (!dragging) seek(_position)
    }, [dragging])

    useLayoutEffect(() => {
        if (!dragging) _setPosition(position)
    }, [position, dragging])

    return (
        <Slider
            focusThumbOnChange={false}
            aria-label="progress-slider"
            value={_position}
            max={duration}
            onChangeStart={(value) => {
                setDragging(true)
                _setPosition(value)
            }}
            onChangeEnd={(value) => {
                if (dragging) {
                    setDragging(false)
                    _setPosition(value)
                }
            }}
            onChange={(value) => {
                _setPosition(value)
            }}
        >
            <SliderTrack bg="#FFFFFF1A" h="2px">
                <SliderFilledTrack bg="#FF0000" zIndex={1} />
                <Box
                    bg="gray.500"
                    w={`${Math.ceil(loadProgress)}%`}
                    h="2px"
                    pos="relative"
                />
            </SliderTrack>
            <SliderThumb boxSize={5}>
                <Box color="tomato" as={MdGraphicEq} />
            </SliderThumb>
        </Slider>
    )
}
