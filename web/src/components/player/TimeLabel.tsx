import { Text } from '@chakra-ui/react'
import React from 'react'
import {
    useAudioPosition,
    useDraggingTime,
} from '../../state/player/contextHooks'
import { formatSeconds } from '../../utils/formatSeconds'

export const TimeLabel = () => {
    const { duration } = useAudioPosition()

    const [position] = useDraggingTime()

    if (duration === Infinity) return null

    return (
        <Text color="#AAAAAA" fontSize="12px">{`${formatSeconds(
            position
        )} / ${formatSeconds(duration)}`}</Text>
    )
}
