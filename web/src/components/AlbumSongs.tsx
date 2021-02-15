import { Divider, Flex } from '@chakra-ui/react'
import React, { FC, Fragment, useContext } from 'react'
import { Song } from '../generated/graphql'
import {
    addSongsAction,
    onSongPause,
    onSongPlay,
} from '../state/player/actions'
import { PlayerContext } from '../state/player/context'
import { AlbumSongLine } from './AlbumSongLine'

export type SongLineType = Pick<
    Song,
    'id' | 'name' | 'order' | 'duration' | 'views' | 'format' | 'link'
>

type AlbumSongsProps = {
    songs: SongLineType[]
    authorName: string
    cover: string
}

export const AlbumSongs: FC<AlbumSongsProps> = ({
    songs,
    authorName,
    cover,
}) => {
    const {
        state: { selectedSong },
        dispatch,
    } = useContext(PlayerContext)
    return (
        <Flex direction="column">
            {songs?.map((s, i) => {
                const isCurrent = s.id === selectedSong?._id

                const onClick = () =>
                    dispatch(
                        isCurrent
                            ? selectedSong?.isPaused
                                ? onSongPlay(s.id)
                                : onSongPause()
                            : addSongsAction([s], authorName, cover) // push to top of the playlist
                    )

                const status = isCurrent
                    ? selectedSong?.isLoading
                        ? 'loading'
                        : selectedSong?.isPaused
                        ? 'paused'
                        : 'playing'
                    : null

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
