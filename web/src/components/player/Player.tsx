import { Box, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { usePlayer } from '../../state/player/context'
import { withApollo } from '../../utils/withApollo'
import { AudioInfo } from './AudioInfo'
import { LeftControls } from './LeftControls'
import { ProgressBar } from './ProgressBar'
import { RightControls } from './RightControls'
import { TimeLabel } from './TimeLabel'

const Player = () => {
    const [dispatch, { showPlayer }] = usePlayer()
    const [loadProgress, setLoadProgress] = useState(0)
    // const { togglePlay } = useAudioPlayer()

    useEffect(() => {
        const onSpacebar = (e: KeyboardEvent) => {
            if (
                e.code === 'Space' &&
                (e.target as any)?.tagName !== 'INPUT' &&
                (e.target as any)?.tagName !== 'TEXTAREA' &&
                showPlayer
            ) {
                e.preventDefault()
                // togglePlay()
            }
        }

        window.addEventListener('keydown', onSpacebar, false)
        return () => {
            window.removeEventListener('keydown', onSpacebar)
        }
    }, [showPlayer])

    return (
        <Box pos="fixed" bottom={0} right={0} left={0}>
            <motion.div
                animate={showPlayer && { translateY: '0%' }}
                initial={{ translateY: '118%' }}
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
