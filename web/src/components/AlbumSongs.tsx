import { Divider, Flex } from '@chakra-ui/react'
import React, { FC, Fragment } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import { Song } from '../generated/graphql'
import { Msg, Player } from '../state/player/actionTypes'
import { usePlayerDispatch, useSelectedSong } from '../state/player/context'
import { AlbumSongLine } from './AlbumSongLine'

export type SongLineType = Pick<
    Song,
    | 'id'
    | 'name'
    | 'order'
    | 'duration'
    | 'views'
    | 'format'
    | 'link'
    | 'albumId'
    | 'authorId'
>

type AlbumSongsProps = {
    songs: SongLineType[]
}

export const AlbumSongs: FC<AlbumSongsProps> = ({ songs }) => {
    const dispatch = usePlayerDispatch()
    const selectedSong = useSelectedSong()
    const { playing, loading, togglePlayPause } = useAudioPlayer()

    return (
        <Flex direction="column">
            {songs?.map((s, i) => {
                const isCurrent = s.id === selectedSong?.id

                const status = isCurrent
                    ? loading
                        ? 'loading'
                        : playing
                        ? 'playing'
                        : 'paused'
                    : null

                const onClick = () => {
                    if (!isCurrent) {
                        dispatch(
                            Msg(Player.AddSongs, {
                                songs: [s],
                            })
                        )
                    } else {
                        togglePlayPause()
                    }
                }

                return (
                    <Fragment key={s.id}>
                        {!isCurrent && i !== 0 && (
                            <Divider sx={{ borderColor: 'gray.500' }} />
                        )}
                        <AlbumSongLine
                            {...s}
                            status={status}
                            onClick={onClick}
                        />
                    </Fragment>
                )
            })}
        </Flex>
    )
}
