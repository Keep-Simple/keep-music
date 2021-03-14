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
            bg="black"
            pos="fixed"
            width="100%"
            transition=".28s ease"
            userSelect="none"
            bottom={0}
            left={0}
            right={0}
            zIndex={20}
            transform={!showPanel ? 'translateY(100%)' : undefined} // not using framer-motion to fix react-beatufil dnd issue with transfrom property
        >
            <Flex
                pb="72px"
                h="94vh"
                flexWrap="wrap"
                pt={{ base: 5, md: 16 }}
                pl={{ base: 0, md: 20 }}
                pr={{ base: 0, md: 24 }}
                alignContent={{ base: 'flex-start', md: 'initial' }}
            >
                <Box
                    mr={{ base: 'auto', xl: 14 }}
                    ml={{ base: 'auto', md: 0 }}
                    mb={{ base: 8, md: 0 }}
                    flexGrow={1.4}
                    flexShrink={5}
                >
                    <Fade in={imageLoaded}>
                        <Box
                            {...bind}
                            w="fit-content"
                            h="fit-content"
                            transition="all .1s ease"
                            pos="relative"
                            mx={{ base: '16%', md: 'auto' }}
                            onClick={() => togglePlay()}
                            boxShadow={
                                hovered
                                    ? 'inset 0px 101px 82px 3px rgba(0,0,0,0.6)'
                                    : 'initial'
                            }
                        >
                            <Image
                                objectFit="cover"
                                pos="relative"
                                maxH="70vh"
                                zIndex={-2}
                                src={selectedSong.cover}
                                onLoad={() => setImageLoad(true)}
                            />
                            <ImageHoveredItems />
                        </Box>
                    </Fade>
                </Box>
                <Flex
                    direction="column"
                    overflow="auto"
                    flexGrow={1}
                    flexBasis={320}
                    px={{ base: '2%', md: 0 }}
                >
                    <PanelSongs songs={songsWithHandlers} />
                </Flex>
            </Flex>
        </Box>
    )
}
