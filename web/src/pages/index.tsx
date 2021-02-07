import { Box, Image, Stack } from '@chakra-ui/react'
import React from 'react'
import AlertUI from '../components/Alert'
import { Layout } from '../components/Layout'
import { Loading } from '../components/Loading'
import { useAlbumsQuery } from '../generated/graphql'
import { withApollo } from '../utils/withApollo'

const Index = () => {
    const { data, error, loading } = useAlbumsQuery({
        variables: {},
        notifyOnNetworkStatusChange: true,
    })

    let body = null

    if (error) {
        body = <AlertUI message={error?.message} />
    } else {
        if (!loading && !data) {
            body = <AlertUI message="No Albums out here" status="info" />
        } else if (!data && loading) {
            body = <Loading />
        } else if (data?.albums) {
            body = (
                <Stack spacing={8}>
                    {data.albums
                        // .filter((a) => a !== null) // cache invalidation will leave null
                        .map(({ id, cover, author, name }) => {
                            return (
                                <Box key={id} p={4}>
                                    <Image
                                        borderRadius="sm"
                                        src={cover}
                                        alt="album cover"
                                    />
                                </Box>
                            )
                        })}
                </Stack>
            )
        }
    }

    return <Layout>{body}</Layout>
}

export default withApollo({ ssr: true })(Index)
