import {
    Button,
    Flex,
    Heading,
    Icon,
    Image,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { AlbumQuery } from '../generated/graphql'
import { Msg, Player } from '../state/player/actionTypes'
import { usePlayerDispatch } from '../state/player/context'
import { secondToMinutesAndHours } from '../utils/formatSeconds'
import { StyledLink } from './StyledLink'

export const AlbumHead: FC<AlbumQuery['album']> = ({
    cover,
    author,
    releaseYear,
    tracksNumber,
    name,
    songs,
}) => {
    const dispatch = usePlayerDispatch()

    const imageDimensions =
        useBreakpointValue({ base: 160, md: 200, lg: 240, xl: 264 }) ?? 160

    const playAlbum = () => {
        if (songs) {
            dispatch(
                Msg(Player.AddSongs, { cover, singer: author.name, songs })
            )
        }
    }

    const albumDuration = secondToMinutesAndHours(
        songs?.reduce((acc, v) => (acc += v.duration), 0) || 0
    )
    return (
        <Flex mb={10}>
            <Image
                src={cover}
                alt="album cover"
                boxSize={imageDimensions}
                objectFit="cover"
            />
            <Flex ml="48px" justifyContent="center" direction="column">
                <Heading size="lg" mb={3}>
                    {name}
                </Heading>
                <Text fontSize="sm" fontWeight="400" color="whiteAlpha.700">
                    {`Album • `}
                    <Text
                        as={StyledLink}
                        href={`/author/${author.id}`}
                        fontSize="sm"
                    >
                        {author.name}
                    </Text>
                    {` • ${releaseYear}`}
                </Text>
                <Text fontSize="sm" fontWeight="400" color="whiteAlpha.700">
                    {`${tracksNumber} songs • ${albumDuration}`}
                </Text>
                <Button
                    mt={9}
                    bg="white"
                    color="black"
                    w={136}
                    h="36px"
                    fontSize="sm"
                    borderRadius={2}
                    variant="none"
                    onClick={playAlbum}
                    leftIcon={
                        <Flex>
                            <Icon as={BsPlayFill} boxSize={6} />
                        </Flex>
                    }
                >
                    Play
                </Button>
            </Flex>
        </Flex>
    )
}
