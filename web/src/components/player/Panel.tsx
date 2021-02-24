import { Center, Fade, Flex, Image } from '@chakra-ui/react'
import { indexBy } from 'rambda'
import React, { FC, useLayoutEffect, useMemo, useState } from 'react'
import { useAlbumsQuery } from '../../generated/graphql'
import { Msg, Player } from '../../state/player/actionTypes'
import {
    useAudioPlayer,
    usePlayer,
    useSelectedSong,
} from '../../state/player/context'
import { PanelSongs } from './PanelSongs'

export const Panel: FC = ({}) => {
    let [dispatch, { showPanel, songs }] = usePlayer()
    const selectedSong = useSelectedSong()
    const { data } = useAlbumsQuery({ fetchPolicy: 'cache-only' })
    const { paused, loading, togglePlay } = useAudioPlayer()
    const [imageLoaded, setImageLoad] = useState(false)

    const albumById = useMemo(() => indexBy('id', data?.albums ?? []), [
        data?.albums,
    ])

    const mainImage = albumById[selectedSong.albumId]?.cover

    useLayoutEffect(() => {
        setImageLoad(false)
    }, [mainImage])

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

        const album = albumById[s.albumId]

        return {
            ...s,
            onClick,
            status,
            cover: album?.cover,
            singer: album?.author?.name,
        } as const
    })

    return (
        <div
            style={{
                transform: !showPanel ? 'translateY(100%)' : undefined,
                position: 'fixed',
                maxWidth: '100vw',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 20,
                transition: '.28s ease',
            }}
        >
            <Flex pt={12} px={20} pb="72px" h="92vh" bg="black">
                <Center mr={14} w="62%">
                    <Fade in={imageLoaded}>
                        <Image
                            objectFit="cover"
                            maxH="70vh"
                            minH="50vh"
                            src={mainImage}
                            onLoad={() => setImageLoad(true)}
                            onClick={() => togglePlay()}
                        />
                    </Fade>
                </Center>
                <Flex direction="column" w="38%" overflow="auto" my={5}>
                    <PanelSongs songs={songsWithHandlers} />
                </Flex>
            </Flex>
        </div>
    )
}
