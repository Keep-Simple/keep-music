import {
    Box,
    Image,
    SimpleGrid,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import AlertUI from '../components/Alert'
import { Layout } from '../components/Layout'
import { Loading } from '../components/Loading'
import { StyledLink } from '../components/StyledLink'
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
                    px={4}
                    justifyItems="center"
                    minChildWidth={imageDimensions}
                    spacing={4}
                    columns={[2, 2, 3, 4, 4, 5]}
                >
                    {data.albums.map(({ id, author, name, cover }) => {
                        return (
                            <Box key={id} w={imageDimensions}>
                                <NextLink href={`/album/${id}`}>
                                    <Image
                                        cursor="pointer"
                                        src={cover}
                                        alt="album cover"
                                        borderRadius={4}
                                        boxSize={imageDimensions}
                                        objectFit="cover"
                                        mb={2}
                                    />
                                </NextLink>
                                <StyledLink href={`/album/${id}`}>
                                    <Text
                                        fontWeight="600"
                                        fontSize="sm"
                                        isTruncated
                                    >
                                        {name}
                                    </Text>
                                </StyledLink>
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
