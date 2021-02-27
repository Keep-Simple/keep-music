import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { FC, useMemo } from 'react'
import { useMediaMeta, useMediaSession } from 'use-media-session'
import { useAlbumQuery } from '../../generated/graphql'
import { Msg, Player } from '../../state/player/actionTypes'
import {
    useAudioPlayer,
    usePlayerDispatch,
    useSelectedSong,
} from '../../state/player/contextHooks'
import { StyledLink } from '../ui/StyledLink'

export const AudioInfo: FC = () => {
    const { name, views, authorId, albumId } = useSelectedSong()
    const dispatch = usePlayerDispatch()
    const { togglePlay, paused, loading } = useAudioPlayer()

    const { data } = useAlbumQuery({
        variables: { id: albumId },
        skip: !albumId,
    })

    const artwork = useMemo(
        () => [{ src: data?.album?.cover ?? '', sizes: '100x150' }],
        [data?.album]
    )

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
        album: data?.album?.name,
        artist: data?.album?.author.name,
        artwork,
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
        </Flex>
    )
}
