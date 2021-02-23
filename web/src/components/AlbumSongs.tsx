import { Divider, Flex } from '@chakra-ui/react'
import React, { FC, Fragment } from 'react'
import { Song } from '../generated/graphql'
import { Msg, Player } from '../state/player/actionTypes'
import {
    useAudioPlayer,
    usePlayer,
    useSelectedSong,
} from '../state/player/context'
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
    const [dispatch, { songs: playerSongs }] = usePlayer()
    const selectedSong = useSelectedSong()
    const { paused, loading, togglePlay } = useAudioPlayer()

    return (
        <Flex direction="column">
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
                    if (!isCurrent) {
                        const isInPlaylist = playerSongs?.find(
                            (ps) => ps.id === s.id
                        )
                        isInPlaylist
                            ? dispatch(Msg(Player.ChangePlayIdx, { id: s.id }))
                            : dispatch(Msg(Player.AddSongs, { songs: [s] }))
                    } else {
                        togglePlay()
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
