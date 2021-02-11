import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Spacer,
    StackDivider,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { GrPlayFill } from 'react-icons/gr'
import { useRouter } from 'next/router'
import AlertUI from '../../components/Alert'
import { Layout } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { useAlbumQuery } from '../../generated/graphql'
import { formatSeconds } from '../../utils/formatSeconds'
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
                <>
                    <Box px="6%">
                        <Flex mb={10}>
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
                                    w={136}
                                    h="36px"
                                    fontSize="sm"
                                    borderRadius={2}
                                    variant="none"
                                    leftIcon={
                                        <Flex>
                                            <Icon as={GrPlayFill} mr={1} />
                                        </Flex>
                                    }
                                >
                                    Play
                                </Button>
                            </Flex>
                        </Flex>
                        <VStack
                            divider={
                                <StackDivider
                                    borderColor="whiteAlpha.400"
                                    h={1}
                                />
                            }
                            spacing={1}
                            align="stretch"
                        >
                            {songs?.map(({ id, name, duration, order }) => (
                                <Flex h={47} align="center" key={id}>
                                    <Flex>
                                        <Text fontSize="sm" mr={6}>
                                            {order}
                                        </Text>
                                        <Text fontSize="sm" fontWeight="600">
                                            {name}
                                        </Text>
                                    </Flex>
                                    <Spacer />
                                    <Text
                                        fontSize="sm"
                                        fontWeight="400"
                                        color="whiteAlpha.700"
                                    >
                                        {formatSeconds(duration)}
                                    </Text>
                                </Flex>
                            ))}
                        </VStack>
                    </Box>
                </>
            )
        }
    }

    return <Layout>{body}</Layout>
}

export default withApollo({ ssr: true })(Index)
