import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/core'
import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import NextLink from 'next/link'
import AlertUI from '../components/Alert'
import { Loading } from '../components/Loading'
import { NextChakraLink } from '../components/NextChakraLink'
import { EditDeletePostButtons } from '../components/EditDeletePostButtons'
import { UpdootSection } from '../components/UpdootSection'
import { withApollo } from '../utils/withApollo'

const Index = () => {
    const { data, error, loading, fetchMore, variables } = usePostsQuery({
        variables: {
            limit: 15,
            cursor: null as string | null,
        },
        notifyOnNetworkStatusChange: true,
    })

    let body = null

    if (error) {
        body = <AlertUI message={error?.message} />
    } else {
        if (!loading && !data) {
            body = <AlertUI message="No Posts, WOW" status="info" />
        } else if (!data && loading) {
            body = <Loading />
        } else if (data) {
            const fetchMorePosts = () => {
                fetchMore({
                    variables: {
                        limit: variables?.limit,
                        cursor: data.posts[data.posts.length - 1].createdAt,
                    },
                })
            }

            body = (
                <>
                    <Stack spacing={8}>
                        {data?.posts
                            .filter((p) => p !== null) // cache invalidation will leave null
                            .map((p) => {
                                const { id, title, textSnippet, creator } = p
                                return (
                                    <Flex
                                        key={id}
                                        p={5}
                                        shadow="md"
                                        borderWidth="1px"
                                    >
                                        <UpdootSection post={p} />
                                        <Box w="100%">
                                            <NextChakraLink
                                                href={`/post/${id}`}
                                            >
                                                <Heading fontSize="xl">
                                                    {title}
                                                </Heading>
                                            </NextChakraLink>

                                            <Text color="blue.400">
                                                posted by {creator.username}
                                            </Text>
                                            <Text mt={4}>{textSnippet}</Text>

                                            <EditDeletePostButtons
                                                postId={id}
                                                creatorId={creator.id}
                                            />
                                        </Box>
                                    </Flex>
                                )
                            })}
                    </Stack>
                    {data && (
                        <Flex>
                            <Button
                                isLoading={loading}
                                my={4}
                                mx="auto"
                                px={8}
                                py={5}
                                onClick={fetchMorePosts}
                            >
                                Load More
                            </Button>
                        </Flex>
                    )}
                </>
            )
        }
    }

    return (
        <Layout>
            <NextLink href="/create-post">
                <Button variantColor="teal" mb={4}>
                    Create Post
                </Button>
            </NextLink>
            {body}
        </Layout>
    )
}

export default withApollo({ ssr: true })(Index)
