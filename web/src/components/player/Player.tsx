import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import { Msg, Player as IPlayer } from '../../state/player/actionTypes'
import { usePlayer, useSelectedSong } from '../../state/player/context'
import { withApollo } from '../../utils/withApollo'
import { AudioInfo } from './AudioInfo'
import { LeftControls } from './LeftControls'
import { PlayerAnalytics } from './PlayerAnalytics'
import { ProgressBar } from './ProgressBar'
import { RightControls } from './RightControls'
import { TimeLabel } from './TimeLabel'

const Player = () => {
    const [dispatch, { showPlayer, songs }] = usePlayer()
    const selectedSong = useSelectedSong()
    const { togglePlayPause, player } = useAudioPlayer({
        src: selectedSong.link,
        autoplay: true,
        html5: true,
        onend: () => !player?.loop() && dispatch(Msg(IPlayer.PlayNext)),
    })
    console.log(songs)

    useEffect(() => {
        const onSpacebar = (e: KeyboardEvent) => {
            if (
                e.code === 'Space' &&
                (e.target as any)?.tagName !== 'INPUT' &&
                (e.target as any)?.tagName !== 'TEXTAREA' &&
                showPlayer
            ) {
                e.preventDefault()
                togglePlayPause()
            }
        }

        window.addEventListener('keydown', onSpacebar, false)
        return () => {
            window.removeEventListener('keydown', onSpacebar)
        }
    }, [showPlayer])

    if (!showPlayer) return null

    return (
        <>
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

            <PlayerAnalytics />
        </>
    )
}

export default withApollo({ ssr: false })(Player)
