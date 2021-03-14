import { Box, Flex, Image, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React, { FC, useMemo } from 'react'
import { useMediaMeta, useMediaSession } from 'use-media-session'
import { useAlbumQuery } from '../../generated/graphql'
import {
    useAudioPlayer,
    usePlayerDispatch,
    useSelectedSong,
} from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { StyledLink } from '../ui/StyledLink'

export const AudioInfo: FC<{ isDesktopView?: boolean }> = ({
    isDesktopView,
}) => {
    const {
        name,
        views,
        authorId,
        albumId,
        cover,
        albumName,
        author,
    } = useSelectedSong()

    const dispatch = usePlayerDispatch()
    const { togglePlay, paused, loading } = useAudioPlayer()

    const { data } = useAlbumQuery({
        variables: { id: albumId },
        skip: !albumId,
    })

    const artwork = useMemo(() => [{ src: cover ?? '', sizes: '100x150' }], [
        cover,
    ])

    useMediaSession({
        playbackState: loading ? (paused ? 'paused' : 'playing') : 'none',
        onPause: () => togglePlay(),
        onPlay: () => togglePlay(),
        onStop: () => togglePlay(),
        onNextTrack: () => dispatch(Msg(Player.PlayNext)),
        onPreviousTrack: () => dispatch(Msg(Player.PlayPrev)),
    })

    useMediaMeta({
        title: name,
        album: albumName,
        artist: author,
        artwork,
    })

    return (
        <>
            <Head>
                <title>{name ? `${name} •` : ''} keep-music</title>
            </Head>
            <Flex align="center" justify="center">
                {isDesktopView && (
                    <Image
                        mr={4}
                        src={data?.album?.cover}
                        boxSize="40px"
                        alt="song cover"
                        borderRadius="sm"
                        objectFit="cover"
                    />
                )}
                <Box>
                    <Text fontSize="md" fontWeight="semibold" isTruncated>
                        {name}
                    </Text>
                    <Text
                        color="#FFFFFFB3"
                        mt={-1}
                        onClick={(e) => e.stopPropagation()}
                        isTruncated
                    >
                        <StyledLink href={`/author/${authorId}`}>
                            {data?.album?.author?.name}
                        </StyledLink>
                        {` • `}
                        <StyledLink href={`/album/${albumId}`}>
                            {data?.album?.name}
                        </StyledLink>
                        {` • ${views} views`}
                    </Text>
                </Box>
            </Flex>
        </>
    )
}
