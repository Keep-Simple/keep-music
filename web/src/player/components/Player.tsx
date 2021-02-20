import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import { usePlayerState, useSelectedSong } from '../../state/player/context'
import { Controls } from './Controls'
import { ProgressBar } from './ProgressBar'
import { TimeLabel } from './TimeLabel'
import { VolumeControl } from './VolumeControl'

const Player = () => {
    const { showPlayer } = usePlayerState()
    const selectedSong = useSelectedSong()
    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: selectedSong.link,
        autoplay: true,
        html5: true,
        onend: () => console.log('sound has ended!'),
    })

    if (!showPlayer) return null

    return (
        <Box pos="fixed" bottom={0} right={0} left={0}>
            <Flex bg="gray.700" h="72px" align="center">
                <Flex flexGrow={1} align="center" ml={2}>
                    <Controls mr={2} />
                    <TimeLabel />
                </Flex>

                <Box flexGrow={2.1}>media controls</Box>

                <Box flexGrow={1}>
                    <VolumeControl />
                </Box>
            </Flex>

            <Box pos="absolute" top={-3} left={0} right={0}>
                <ProgressBar />
            </Box>
        </Box>
    )
}

export default Player
