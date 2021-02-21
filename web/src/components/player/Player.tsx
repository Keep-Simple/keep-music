import { Box, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { HowlOptions } from 'howler'
import React, { useEffect, useState } from 'react'
import { useAudio } from 'react-use'
import { useAudioPlayer } from 'react-use-audio-player'
import { Msg, Player as IPlayer } from '../../state/player/actionTypes'
import { usePlayer, useSelectedSong } from '../../state/player/context'
import { withApollo } from '../../utils/withApollo'
import { AudioInfo } from './AudioInfo'
import { LeftControls } from './LeftControls'
import { ProgressBar } from './ProgressBar'
import { RightControls } from './RightControls'
import { TimeLabel } from './TimeLabel'

const howlOptions: HowlOptions = {
    autoplay: true,
    // preload: false,
    html5: true,
    volume: 0.5,
    pool: 1,
    format: ['mp3', 'flac'],
}

const Player = () => {
    const [dispatch, { showPlayer }] = usePlayer()
    const selectedSong = useSelectedSong()
    const [loadProgress, setLoadProgress] = useState(0)
    const [audio, state, controls, ref] = useAudio({
        src: selectedSong.link,
        autoPlay: true,
    })
    const { togglePlayPause, player } = useAudioPlayer({
        // src: selectedSong.link,
        onend: () => dispatch(Msg(IPlayer.PlayNext)),
        ...howlOptions,
    })
    useEffect(() => {
        const handleLoad = () => {
            const node: HTMLAudioElement = (player as any)._sounds[0]._node
            node.addEventListener('progress', (some) => {
                const duration = player?.duration()
                console.log('progress', some)

                if (duration && duration > 0) {
                    for (let i = 0; i < node.buffered.length; i++) {
                        if (
                            node.buffered.start(node.buffered.length - 1 - i) <
                            node.currentTime
                        ) {
                            const bufferProgress =
                                (node.buffered.end(
                                    node.buffered.length - 1 - i
                                ) /
                                    duration) *
                                100
                            setLoadProgress(bufferProgress)
                            console.log({ bufferProgress })
                            break
                        }
                    }
                }
            })
        }

        player?.on('load', handleLoad)

        return () => {
            // player?.off('load', handleLoad)
            setLoadProgress(0)
        }
    }, [player])

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

    // console.log({ showPlayer, selectedSong, ready })
    // if (!ready) return null

    return (
        <Box pos="fixed" bottom={0} right={0} left={0}>
            {audio}
            <motion.div
                animate={showPlayer && { translateY: '0%' }}
                // initial={{ translateY: '118%' }}
            >
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

                <Box pos="absolute" top={-2} left={0} right={0}>
                    <ProgressBar loadProgress={loadProgress} />
                </Box>
            </motion.div>
        </Box>
    )
}

export default withApollo({ ssr: false })(Player)
