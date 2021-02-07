import {
    Box,
    Button,
    Flex,
    Heading,
    StackDivider,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import AlertUI from '../../components/Alert'
import { Layout } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { useAlbumQuery } from '../../generated/graphql'
import { withApollo } from '../../utils/withApollo'

const Index = () => {
    const router = useRouter()
    const { id } = router.query

    const { data, error, loading } = useAlbumQuery({
        variables: { id: parseInt(id as string) },
    })

    const imageDimensions =
        useBreakpointValue({ base: 160, md: 200, lg: 240, xl: 264 }) ?? 160

    let body = null

    if (error) {
        body = <AlertUI message={error?.message} />
    } else {
        if (!loading && !data) {
            body = <AlertUI message="No such album found" status="info" />
        } else if (!data && loading) {
            body = <Loading />
        } else if (data?.album) {
            const {
                author,
                tracksNumber,
                songs,
                realeaseDate,
                name,
            } = data.album
            body = (
                <Box px={10}>
                    <Flex>
                        <Image
                            src={'download_amboak'}
                            className="km-album-cover"
                            alt="album cover"
                            objectFit="cover"
                            layout="fixed"
                            width={imageDimensions}
                            height={imageDimensions}
                        />
                        <Flex
                            ml="48px"
                            justifyContent="center"
                            direction="column"
                        >
                            <Heading as="h2" size="xl" mb={3}>
                                {name}
                            </Heading>
                            <Text
                                fontSize="sm"
                                fontWeight="400"
                                color="whiteAlpha.700"
                            >
                                {`Album • ${author.name} • ${
                                    realeaseDate || 2020
                                }`}
                            </Text>
                            <Text
                                fontSize="sm"
                                fontWeight="400"
                                color="whiteAlpha.700"
                            >
                                {`${tracksNumber} songs • 50 minutes`}
                            </Text>
                            <Button
                                mt={7}
                                bg="white"
                                color="black"
                                w={146}
                                h="36px"
                                borderRadius={2}
                                variant="none"
                                // rightIcon={<ArrowRightIcon ml={1} />}
                            >
                                Play
                            </Button>
                        </Flex>
                    </Flex>
                    <VStack
                        divider={
                            <StackDivider borderColor="whiteAlpha.400" h={1} />
                        }
                        spacing={1}
                        align="stretch"
                    >
                        {songs?.map((s) => (
                            <Flex h={57} align="center">
                                {s.name}
                            </Flex>
                        ))}
                    </VStack>
                </Box>
            )
        }
    }

    return <Layout>{body}</Layout>
}

export default withApollo({ ssr: true })(Index)
