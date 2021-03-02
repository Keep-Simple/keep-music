import { Divider, Flex } from '@chakra-ui/react'
import React, { FC, Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import {
    useAudioPlayer,
    usePlayer,
    useSelectedSong,
} from '../state/player/contextsHooks'
import { Msg, Player } from '../state/player/types/actionTypes'
import { PlayerSong } from '../state/player/types/entityTypes'
import { AlbumSongLine } from './AlbumSongLine'

type AlbumSongsProps = {
    songs: PlayerSong[]
    loading: boolean
}

export const AlbumSongs: FC<AlbumSongsProps> = ({
    songs,
    loading: songsLoading,
}) => {
    const [dispatch, { songs: playerSongs }] = usePlayer()
    const selectedSong = useSelectedSong()
    const { paused, loading, togglePlay } = useAudioPlayer()

    if (songsLoading) {
        return <Skeleton height={57} count={7} />
    }

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
                            <Divider
                                sx={{
                                    borderColor: 'whiteAlpha.100',
                                    opacity: 1,
                                }}
                            />
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
