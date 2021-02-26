import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { FC, useEffect, useMemo } from 'react'
import { useMediaMeta, useMediaSession } from 'use-media-session'
import { useAlbumQuery } from '../../generated/graphql'
import { useMedia } from '../../react-chromecast'
import { Msg, Player } from '../../state/player/actionTypes'
import {
    useAudioPlayer,
    usePlayerDispatch,
    useSelectedSong,
} from '../../state/player/contextHooks'
import { StyledLink } from '../ui/StyledLink'

export const AudioInfo: FC = () => {
    const { id, name, views, authorId, albumId, link } = useSelectedSong()
    const dispatch = usePlayerDispatch()
    const {
        togglePlay,
        paused,
        loading,
        audioRef,
        toggleMute,
    } = useAudioPlayer()
    const media = useMedia()

    const { data } = useAlbumQuery({
        variables: { id: albumId },
        skip: !albumId,
    })

    const artwork = useMemo(
        () => [{ src: data?.album?.cover ?? '', sizes: '100x150' }],
        [data?.album]
    )

    useEffect(() => {
        const album = data?.album
        if (!album) return

        media?.playMedia({
            cover: album.cover,
            releaseYear: album.releaseYear,
            albumName: album.name,
            albumArtist: album.author.name,
            src: link,
            title: name,
        })

        toggleMute(true)
    }, [id])

    useMediaSession({
        playbackState: loading ? (paused ? 'paused' : 'playing') : 'none',
        onPause: () => togglePlay(),
        onPlay: () => togglePlay(),
        onSeekBackward: () => {
            if (audioRef.current) {
                audioRef.current.currentTime -= 15
            }
        },
        onSeekForward: () => {
            if (audioRef.current) {
                audioRef.current.currentTime += 15
            }
        },
        onStop: () => togglePlay(),
        onNextTrack: () => dispatch(Msg(Player.PlayNext)),
        onPreviousTrack: () => dispatch(Msg(Player.PlayPrev)),
    })

    useMediaMeta({
        title: name,
        album: data?.album?.name,
        artist: data?.album?.author.name,
        artwork,
    })

    const GoogleCast = React.createElement('google-cast-launcher', {
        id: 'castbutton',
    })

    return (
        <Flex align="center" justify="center">
            <Image
                mr={4}
                src={data?.album?.cover}
                boxSize="40px"
                alt="song cover"
                borderRadius="sm"
                objectFit="cover"
            />
            <Box>
                <Text fontSize="md" fontWeight="semibold">
                    {name}
                </Text>
                <Text
                    color="#FFFFFFB3"
                    mt={-1}
                    onClick={(e) => e.stopPropagation()}
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
            {GoogleCast}
        </Flex>
    )
}
