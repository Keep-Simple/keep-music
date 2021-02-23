import { Center, Divider, Fade, Flex, Image, Slide } from '@chakra-ui/react'
import { indexBy } from 'rambda'
import React, { FC, Fragment, useLayoutEffect, useMemo, useState } from 'react'
import { useAlbumsQuery } from '../../generated/graphql'
import { Msg, Player } from '../../state/player/actionTypes'
import {
    useAudioPlayer,
    usePlayer,
    useSelectedSong,
} from '../../state/player/context'
import { PanelSongLine } from '../PanelSongLine'

export const Panel: FC = ({}) => {
    let [dispatch, { showPanel, songs }] = usePlayer()
    const selectedSong = useSelectedSong()
    const { data } = useAlbumsQuery()
    const { paused, loading, togglePlay } = useAudioPlayer()
    const [imageLoaded, setImageLoad] = useState(false)

    const albumById = useMemo(() => indexBy('id', data?.albums ?? []), [
        data?.albums,
    ])

    const mainImage = albumById[selectedSong.albumId]?.cover

    useLayoutEffect(() => {
        setImageLoad(false)
    }, [mainImage])

    return (
        <Slide direction="bottom" in={showPanel} style={{ zIndex: 20 }}>
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
                    {songs?.map((s, i) => {
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

                        return (
                            <Fragment key={s.id}>
                                {!isCurrent && i !== 0 && (
                                    <Divider
                                        sx={{ borderColor: 'whiteAlpha.400' }}
                                    />
                                )}
                                <PanelSongLine
                                    {...s}
                                    status={status}
                                    onClick={onClick}
                                    cover={albumById[s.albumId].cover}
                                    singer={albumById[s.albumId].author.name}
                                />
                            </Fragment>
                        )
                    })}
                </Flex>
            </Flex>
        </Slide>
    )
}
