import {
    Box,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MdGraphicEq } from 'react-icons/md'
import { useAudioPosition, useDraggingTime } from '../../state/player/context'
import { useHover } from '../../utils/hooks/useHover'
import { useTrackSongView } from './PlayerAnalytics'

export const ProgressBar = () => {
    useTrackSongView()
    const { duration, seek, position, loadProgress } = useAudioPosition()
    const [_position, _setPosition] = useDraggingTime()

    const [dragging, setDragging] = useState(false)
    const [sync, setSync] = useState(true)
    const { bind, hovered } = useHover()

    useLayoutEffect(() => {
        if (dragging) return

        if (!sync) {
            if (Math.abs(position - _position) <= 1) {
                setSync(true)
            }
        } else {
            _setPosition(position)
        }
    }, [position, dragging, sync])

    useEffect(() => {
        if (!dragging) {
            seek(_position)
        }
    }, [dragging])

    const height = hovered ? '4px' : '2px'

    return (
        <Box {...bind}>
            <Slider
                focusThumbOnChange={false}
                aria-label="progress-slider"
                value={_position}
                max={duration || 100}
                onChangeStart={(value) => {
                    setDragging(true)
                    _setPosition(value)
                }}
                onChangeEnd={(value) => {
                    if (dragging) {
                        setDragging(false)
                        setSync(false)
                        _setPosition(value)
                    }
                }}
                onChange={(value) => {
                    if (value === position) {
                        setDragging(false)
                    }
                    _setPosition(value)
                }}
            >
                <SliderTrack bg="#FFFFFF1A" h={height}>
                    <SliderFilledTrack bg="red.500" zIndex={1} />
                    <Box
                        bg="gray.500"
                        w={`${Math.ceil(loadProgress)}%`}
                        h={height}
                        pos="relative"
                    />
                </SliderTrack>
                <SliderThumb boxSize={5}>
                    <Box color="red.500" as={MdGraphicEq} />
                </SliderThumb>
            </Slider>
        </Box>
    )
}
