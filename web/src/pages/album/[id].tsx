import { Box } from '@chakra-ui/react'
import { AlbumHead } from 'components/AlbumHead'
import { AlbumSongs } from 'components/AlbumSongs'
import AlertUI from 'components/ui/Alert'
import { Layout } from 'components/ui/Layout'
import { useAlbumQuery } from 'generated/graphql'
import React from 'react'
import { useGetQueryId } from 'utils/hooks/useGetQueryId'
import { withApollo } from 'utils/withApollo'

const Album = () => {
    const id = useGetQueryId()
    const { data, error, loading } = useAlbumQuery({
        variables: { id },
    })

    const skeleton = (body: any) => <Layout>{body}</Layout>

    if (error) return skeleton(<AlertUI message={error?.message} />)

    if (!loading && !data)
        return skeleton(<AlertUI message="No such album found" status="info" />)

    const songs =
        data?.album?.songs?.map((s) => ({
            ...s,
            cover: data.album!.cover,
            author: data.album!.author.name,
            albumName: data.album!.name,
        })) ?? []

    return skeleton(
        <Box px={56} pb="5%">
            <AlbumHead {...data?.album} albumSongs={songs} loading={loading} />
            <AlbumSongs songs={songs} loading={loading} />
        </Box>
    )
}

export default withApollo({ ssr: true })(Album)
