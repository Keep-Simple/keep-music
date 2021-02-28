import { Box, Fade } from '@chakra-ui/react'
import React from 'react'
import { AlbumHead } from '../../components/AlbumHead'
import { AlbumSongs } from '../../components/AlbumSongs'
import AlertUI from '../../components/ui/Alert'
import { Layout } from '../../components/ui/Layout'
import { Loading } from '../../components/ui/Loading'
import { useAlbumQuery } from '../../generated/graphql'
import { useGetQueryId } from '../../utils/hooks/useGetQueryId'
import { withApollo } from '../../utils/withApollo'

const Album = () => {
    const id = useGetQueryId()
    const { data, error, loading } = useAlbumQuery({
        variables: { id },
    })

    const skeleton = (body: any) => <Layout>{body}</Layout>

    if (error) return skeleton(<AlertUI message={error?.message} />)

    if (!loading && !data)
        return skeleton(<AlertUI message="No such album found" status="info" />)

    if (!data && loading) return skeleton(<Loading />)

    if (data?.album) {
        const songs =
            data.album.songs?.map((s) => ({
                ...s,
                cover: data.album!.cover,
                author: data.album!.author.name,
                albumName: data.album!.name,
            })) ?? []

        return skeleton(
            <Fade in={!loading}>
                <Box px="6%" pb="5%">
                    <AlbumHead {...data.album} albumSongs={songs} />
                    <AlbumSongs songs={songs} />
                </Box>
            </Fade>
        )
    }
}

export default withApollo({ ssr: true })(Album)
