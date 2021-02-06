import { Flex, Stack } from '@chakra-ui/react'
import AlertUI from '../components/Alert'
import { Layout } from '../components/Layout'
import { Loading } from '../components/Loading'
import { usePostsQuery } from '../generated/graphql'
import { withApollo } from '../utils/withApollo'

const Index = () => {
    const { data, error, loading } = usePostsQuery({
        variables: {},
        notifyOnNetworkStatusChange: true,
    })

    let body = null

    if (error) {
        body = <AlertUI message={error?.message} />
    } else {
        if (!loading && !data) {
            body = <AlertUI message="No Songs out here" status="info" />
        } else if (!data && loading) {
            body = <Loading />
        } else if (data) {
            body = (
                <Stack spacing={8}>
                    {data?.posts
                        .filter((p) => p !== null) // cache invalidation will leave null
                        .map((p) => {
                            return (
                                <Flex
                                    key={id}
                                    p={5}
                                    shadow="md"
                                    borderWidth="1px"
                                ></Flex>
                            )
                        })}
                </Stack>
            )
        }
    }

    return <Layout>{body}</Layout>
}

export default withApollo({ ssr: true })(Index)
