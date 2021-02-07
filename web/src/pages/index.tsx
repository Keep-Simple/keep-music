import { Box, SimpleGrid, useBreakpointValue, Text } from '@chakra-ui/react'
import Image from 'next/image'
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

    const imageDimensions =
        useBreakpointValue({ base: 160, md: 190, xl: 226 }) ?? 160

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
                <SimpleGrid
                    minChildWidth={imageDimensions}
                    spacing={4}
                    columns={[2, 2, 3, 4, 5]}
                >
                    {data.albums.map(({ id, cover, author, name }) => {
                        return (
                            <Box key={id}>
                                <Image
                                    src={'download_amboak'}
                                    className="km-album-cover"
                                    alt="album cover"
                                    objectFit="cover"
                                    layout="fixed"
                                    width={imageDimensions}
                                    height={imageDimensions}
                                />
                                <Text
                                    fontSize="lg"
                                    fontWeight="500"
                                    isTruncated
                                >
                                    {name}
                                </Text>
                                <Text
                                    fontSize="sm"
                                    fontWeight="400"
                                    color="whiteAlpha.700"
                                    isTruncated
                                >
                                    {`Album • ${author.name}`}
                                </Text>
                            </Box>
                        )
                    })}
                </SimpleGrid>
            )
        }
    }

    return <Layout>{body}</Layout>
}

export default withApollo({ ssr: true })(Index)
