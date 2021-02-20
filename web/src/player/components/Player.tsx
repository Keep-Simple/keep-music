import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import { Msg, Player as IPlayer } from '../../state/player/actionTypes'
import { usePlayer, useSelectedSong } from '../../state/player/context'
import { AudioInfo } from './AudioInfo'
import { LeftControls } from './LeftControls'
import { ProgressBar } from './ProgressBar'
import { RightControls } from './RightControls'
import { TimeLabel } from './TimeLabel'

const Player = () => {
    const [dispatch, { showPlayer, songs }] = usePlayer()
    const selectedSong = useSelectedSong()
    const { togglePlayPause, ready, loading, playing, player } = useAudioPlayer(
        {
            src: selectedSong.link,
            autoplay: true,
            html5: true,
            onend: () => !player?.loop() && dispatch(Msg(IPlayer.PlayNext)),
        }
    )
    console.log(songs)

    if (!showPlayer) return null

    return (
        <Box pos="fixed" bottom={0} right={0} left={0}>
            <Flex bg="gray.700" h="72px" align="center">
                <Flex flexGrow={1} align="center" ml={2}>
                    <LeftControls mr={2} />
                    <TimeLabel />
                </Flex>

                <Box flexGrow={2.1}>
                    <AudioInfo />
                </Box>

                <Box flexGrow={1}>
                    <RightControls />
                </Box>
            </Flex>

            <Box pos="absolute" top={-3} left={0} right={0}>
                <ProgressBar />
            </Box>
        </Box>
    )
}

export default Player
