import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useAudioPlayer, usePlayer } from '../../state/player/contextsHooks'
import { Msg, Player as IPlayer } from '../../state/player/types/actionTypes'
import { useHover } from '../../utils/hooks/useHover'
import { withApollo } from '../../utils/withApollo'
import { AudioInfo } from './AudioInfo'
import { LeftControls } from './LeftControls'
import { Panel } from './Panel'
import { ProgressBar } from './ProgressBar'
import { RightControls } from './RightControls'
import { TimeLabel } from './TimeLabel'

const Player = () => {
    const [dispatch, { showPlayer }] = usePlayer()
    const { hovered, bind } = useHover()
    const { togglePlay } = useAudioPlayer()
    const isDesktopView = useBreakpointValue({ base: false, md: true })

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
                {...bind}
                pos="fixed"
                userSelect="none"
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
                            <LeftControls
                                mr={2}
                                isDesktopView={isDesktopView}
                            />
                            {isDesktopView && <TimeLabel />}
                        </Flex>

                        <Box flexGrow={isDesktopView ? 2.1 : 1}>
                            <AudioInfo isDesktopView={isDesktopView} />
                        </Box>

                        <Box flexGrow={1}>
                            <RightControls isDesktopView={isDesktopView} />
                        </Box>
                    </Flex>

                    <Box pos="absolute" top="-8px" left={0} right={0}>
                        <ProgressBar hovered={hovered} />
                    </Box>
                </motion.div>
            </Box>

            <Panel />
        </>
    )
}

export default withApollo({ ssr: false })(Player)
