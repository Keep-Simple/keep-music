import { Box } from '@chakra-ui/react'
import React from 'react'
import { AlbumHead } from '../../components/AlbumHead'
import { AlbumSongs } from '../../components/AlbumSongs'
import AlertUI from '../../components/Alert'
import { Layout } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { useAlbumQuery } from '../../generated/graphql'
import { useGetQueryId } from '../../utils/hooks/useGetQueryId'
import { withApollo } from '../../utils/withApollo'

const Index = () => {
    const id = useGetQueryId()
    const { data, error, loading } = useAlbumQuery({
        variables: { id },
    })

    let body = null

    if (error) {
        body = <AlertUI message={error?.message} />
    } else {
        if (!loading && !data) {
            body = <AlertUI message="No such album found" status="info" />
        } else if (!data && loading) {
            body = <Loading />
        } else if (data?.album) {
            body = (
                <Box px="6%" pb="5%">
                    <AlbumHead {...data.album} />
                    <AlbumSongs
                        songs={data.album.songs || []}
                        cover={data.album.cover}
                        authorName={data.album.author.name}
                    />
                </Box>
            )
        }
    }

    return <Layout>{body}</Layout>
}

export default withApollo({ ssr: true })(Index)
