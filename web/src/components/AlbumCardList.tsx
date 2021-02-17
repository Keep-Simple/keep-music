import { useApolloClient } from '@apollo/client'
import { SimpleGrid, useBreakpointValue, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import {
    AlbumDocument,
    AlbumQuery,
    AlbumQueryVariables,
    useAlbumsQuery,
} from '../generated/graphql'
import { addSongsAction } from '../state/player/actions'
import { PlayerContext } from '../state/player/context'
import { AlbumCard } from './AlbumCard'
import AlertUI from './Alert'
import { Loading } from './Loading'

export const AlbumCardList = () => {
    const client = useApolloClient()
    const { dispatch } = useContext(PlayerContext)
    const toast = useToast()

    const { data, error, loading } = useAlbumsQuery({
        variables: {},
        notifyOnNetworkStatusChange: true,
    })

    const coverSize = useBreakpointValue({
        base: 160,
        md: 190,
        xl: 226,
    }) as number

    if (error) return <AlertUI message={error?.message} />

    if (!loading && !data?.albums)
        return <AlertUI message="No Albums out here" status="info" />

    if (!data?.albums && loading) return <Loading />

    const playAlbum = async (id: number) => {
        const { data } = await client.query<AlbumQuery, AlbumQueryVariables>({
            query: AlbumDocument,
            variables: { id },
        })

        if (!data.album) {
            return toast({
                status: 'error',
                title: "Can't play album",
                description: 'Try opening album page directly',
            })
        }

        const {
            songs = [],
            cover,
            author: { name: singer },
        } = data.album

        dispatch(addSongsAction(songs!, singer, cover))
    }

    return (
        <SimpleGrid
            px={4}
            justifyItems="center"
            minChildWidth={coverSize}
            spacing={4}
            columns={[2, 2, 3, 4, 4, 5]}
        >
            {data?.albums?.map(({ id, author, name, cover }) => (
                <AlbumCard
                    key={id}
                    id={id}
                    playAlbum={() => playAlbum(id)}
                    coverSize={coverSize}
                    name={name}
                    cover={cover}
                    author={author}
                />
            ))}
        </SimpleGrid>
    )
}
