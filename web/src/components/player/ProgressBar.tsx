import {
    Box,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react'
import React, { useLayoutEffect, useState } from 'react'
import { useTrackSongView } from '../../services/playerAnalytics'
import {
    useAudioPosition,
    useDraggingTime,
} from '../../state/player/contextsHooks'

export const ProgressBar = ({ hovered = false }) => {
    useTrackSongView()
    const { duration, seek, position, loadProgress } = useAudioPosition()
    const [_position, _setPosition] = useDraggingTime()

    const [dragging, setDragging] = useState(false)
    const [sync, setSync] = useState(true)

    useLayoutEffect(() => {
        if (!dragging) {
            seek(_position)
        }
    }, [dragging])

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

    const height = hovered ? '4px' : '2px'

    return (
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
            onClick={(e) => e.stopPropagation()}
        >
            <SliderTrack bg="#FFFFFF1A" h={height}>
                <SliderFilledTrack bg="red.500" zIndex={1} />
                <Box
                    bg="#FFFFFF1A"
                    w={`${Math.ceil(loadProgress)}%`}
                    h={height}
                    pos="relative"
                />
            </SliderTrack>
            <SliderThumb
                bg="red.500"
                opacity={hovered ? 1 : 0}
                transition="opacity .3s ease"
                _focus={{ opacity: 1 }}
            />
        </Slider>
    )
}
