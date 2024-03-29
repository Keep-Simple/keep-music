import { useApolloClient } from '@apollo/client'
import { SimpleGrid, useBreakpointValue, useToast } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import {
    AlbumDocument,
    AlbumQuery,
    AlbumQueryVariables,
    useAlbumsQuery,
} from '../generated/graphql'
import {
    useAudioPlayer,
    usePlayer,
    useSelectedSong,
} from '../state/player/contextsHooks'
import { Msg, Player } from '../state/player/types/actionTypes'
import { AlbumCard } from './AlbumCard'
import AlertUI from './ui/Alert'
import { Loading } from './ui/Loading'

export const AlbumCardList = () => {
    const client = useApolloClient()
    const [dispatch, { albumLoading }] = usePlayer()
    const selectedSong = useSelectedSong()
    const player = useAudioPlayer()
    const toast = useToast()

    const { data, error, loading } = useAlbumsQuery({
        variables: {},
        notifyOnNetworkStatusChange: true,
    })

    const coverSize =
        useBreakpointValue({
            base: 160,
            md: 190,
            xl: 226,
        }) ?? 226

    const playAlbum = useCallback(async (id: number) => {
        dispatch(Msg(Player.LoadAlbum, { isLoading: true, id }))

        const { data } = await client.query<AlbumQuery, AlbumQueryVariables>({
            query: AlbumDocument,
            variables: { id },
        })

        if (!data.album) {
            toast({
                status: 'error',
                title: "Can't play album",
                description: 'Try opening album page directly',
            })
        } else {
            const songs =
                data.album.songs?.map((s) => ({
                    ...s,
                    cover: data.album!.cover,
                    author: data.album!.author.name,
                    albumName: data.album!.name,
                })) ?? []

            dispatch(Msg(Player.AddSongs, { songs }))
        }
        dispatch(Msg(Player.LoadAlbum, { isLoading: false }))
    }, [])

    if (error) return <AlertUI message={error?.message} />

    if (!loading && !data?.albums)
        return <AlertUI message="No Albums out here" status="info" />

    if (!data?.albums && loading) return <Loading />

    return (
        <SimpleGrid
            px={20}
            justifyItems="center"
            minChildWidth={coverSize}
            spacingX={4}
            spacingY={12}
            columns={[2, 2, 3, 4, 4, 5]}
        >
            {data?.albums?.map(({ id, author, name, cover }) => {
                const isCurrentPlaying = selectedSong?.albumId === id
                const isCurrentLoading = albumLoading.id === id

                const status = isCurrentLoading
                    ? 'loading'
                    : isCurrentPlaying
                    ? player.loading
                        ? 'loading'
                        : player.paused
                        ? 'paused'
                        : 'playing'
                    : null

                const onIconClick = () => {
                    if (!status) {
                        return playAlbum(id)
                    }
                    if (['paused', 'playing'].includes(status)) {
                        return player.togglePlay()
                    }
                }

                return (
                    <AlbumCard
                        key={id}
                        id={id}
                        playStatus={status}
                        onIconClick={onIconClick}
                        coverSize={coverSize}
                        name={name}
                        cover={cover}
                        author={author}
                    />
                )
            })}
        </SimpleGrid>
    )
}
