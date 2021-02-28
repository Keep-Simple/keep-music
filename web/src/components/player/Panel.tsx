import { Box, Fade, Flex, Image, Text } from '@chakra-ui/react'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import {
    useAudioPlayer,
    useCastContext,
    usePlayer,
    useSelectedSong,
} from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { useHover } from '../../utils/hooks/useHover'
import { GoogleCastButton } from './GoogleCastButton'
import { PanelSongs } from './PanelSongs'

export const Panel: FC = ({}) => {
    const { paused, loading, togglePlay } = useAudioPlayer()
    const { deviceName } = useCastContext()
    const [imageLoaded, setImageLoad] = useState(false)
    const { hovered, bind } = useHover()
    const [dispatch, { showPanel, songs }] = usePlayer()
    const selectedSong = useSelectedSong()

    useLayoutEffect(() => {
        setImageLoad(false)
    }, [selectedSong.cover])

    const songsWithHandlers = songs?.map((s) => {
        const isCurrent = s.id === selectedSong?.id

        const status = isCurrent
            ? loading
                ? 'loading'
                : paused
                ? 'paused'
                : 'playing'
            : null

        const onClick = () => {
            isCurrent
                ? togglePlay()
                : dispatch(
                      Msg(Player.ChangePlayIdx, {
                          id: s.id,
                      })
                  )
        }

        return {
            ...s,
            onClick,
            status,
        } as const
    })

    useEffect(() => {
        document.body.style.overflow = showPanel ? 'hidden' : 'auto'
    }, [showPanel])

    const ImageHoveredItems = () => {
        return deviceName ? (
            <Flex
                pos="absolute"
                bg="black"
                borderRadius="md"
                align="center"
                opacity={0.85}
                bottom={6}
                left={4}
                p={2}
            >
                <GoogleCastButton />
                <Text ml={3}>
                    {`Playing on `}
                    <Text fontWeight="bold" as="span">
                        {deviceName}
                    </Text>
                </Text>
            </Flex>
        ) : hovered ? (
            <Box pos="absolute" right={6} top={6} color="white">
                <GoogleCastButton disconnectedColor="white" />
            </Box>
        ) : null
    }

    return (
        <Box
            transform={!showPanel ? 'translateY(100%)' : undefined} // not using framer-motion to fix react-beatufil dnd issue with transfrom property
            bg="black"
            pos="fixed"
            maxWidth="100vw"
            bottom={0}
            left={0}
            right={0}
            zIndex={20}
            transition=".28s ease"
            userSelect="none"
        >
            <Flex pt={16} pl={20} pr={24} pb="72px" h="94vh">
                <Box mr={14} w="62%">
                    <Fade in={imageLoaded}>
                        <Box
                            mx="auto"
                            w="fit-content"
                            h="fit-content"
                            transition="all .1s ease"
                            pos="relative"
                            onLoad={() => setImageLoad(true)}
                            onClick={() => togglePlay()}
                            boxShadow={
                                hovered
                                    ? 'inset 0px 101px 82px 3px rgba(0,0,0,0.6)'
                                    : 'initial'
                            }
                            {...bind}
                        >
                            <Image
                                zIndex={-2}
                                src={selectedSong.cover}
                                objectFit="cover"
                                pos="relative"
                                maxH="70vh"
                                minH="50vh"
                                minW="40vw"
                            />
                            <ImageHoveredItems />
                        </Box>
                    </Fade>
                </Box>
                <Flex direction="column" w="34%" overflow="auto">
                    <PanelSongs songs={songsWithHandlers} />
                </Flex>
            </Flex>
        </Box>
    )
}
