import { Box, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Msg, Player as IPlayer } from '../../state/player/actionTypes'
import { useAudioPlayer, usePlayer } from '../../state/player/context'
import { withApollo } from '../../utils/withApollo'
import { AudioInfo } from './AudioInfo'
import { LeftControls } from './LeftControls'
import { Panel } from './Panel'
import { ProgressBar } from './ProgressBar'
import { RightControls } from './RightControls'
import { TimeLabel } from './TimeLabel'

const Player = () => {
    const [dispatch, { showPlayer }] = usePlayer()
    const { togglePlay } = useAudioPlayer()

    useEffect(() => {
        const onSpacebar = (e: KeyboardEvent) => {
            if (
                e.code === 'Space' &&
                (e.target as any)?.tagName !== 'INPUT' &&
                (e.target as any)?.tagName !== 'TEXTAREA' &&
                showPlayer
            ) {
                e.preventDefault()
                togglePlay()
            }
        }

        window.addEventListener('keydown', onSpacebar, false)
        return () => {
            window.removeEventListener('keydown', onSpacebar)
        }
    }, [showPlayer, togglePlay])

    return (
        <>
            <Box
                pos="fixed"
                bottom={0}
                right={0}
                left={0}
                zIndex={100}
                onClick={() => dispatch(Msg(IPlayer.TogglePanel))}
            >
                <motion.div
                    animate={showPlayer && { translateY: '0%' }}
                    initial={{ translateY: '118%' }}
                >
                    <Flex id="player-bar" bg="gray.700" h="72px" align="center">
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

                    <Box pos="absolute" top="-10px" left={-3} right={3}>
                        <ProgressBar />
                    </Box>
                </motion.div>
            </Box>

            <Panel />
        </>
    )
}

export default withApollo({ ssr: false })(Player)
