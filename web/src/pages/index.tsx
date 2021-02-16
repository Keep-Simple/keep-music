import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react'
import { AlbumCard } from '../components/AlbumCard'
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

    const coverSize = useBreakpointValue({
        base: 160,
        md: 190,
        xl: 226,
    }) as number

    const skeleton = (body: any) => <Layout>{body}</Layout>

    if (error) return skeleton(<AlertUI message={error?.message} />)

    if (!loading && !data)
        return skeleton(<AlertUI message="No Albums out here" status="info" />)

    if (!data && loading) return skeleton(<Loading />)

    if (data?.albums) {
        return skeleton(
            <SimpleGrid
                px={4}
                justifyItems="center"
                minChildWidth={coverSize}
                spacing={4}
                columns={[2, 2, 3, 4, 4, 5]}
            >
                {data.albums.map(({ id, author, name, cover }) => (
                    <AlbumCard
                        key={id}
                        id={id}
                        coverSize={coverSize}
                        name={name}
                        cover={cover}
                        author={author}
                    />
                ))}
            </SimpleGrid>
        )
    }
}

export default withApollo({ ssr: true })(Index)
