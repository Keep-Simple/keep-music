import {
    Button,
    Flex,
    Heading,
    Image,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { AlbumQuery } from '../generated/graphql'
import { usePlayerDispatch } from '../state/player/contextsHooks'
import { Msg, Player } from '../state/player/types/actionTypes'
import { PlayerSong } from '../state/player/types/entityTypes'
import { secondToMinutesAndHours } from '../utils/formatSeconds'
import { Icons } from './ui/Icons'
import { StyledLink } from './ui/StyledLink'

type Props = Partial<AlbumQuery['album']> & {
    albumSongs: PlayerSong[]
}

export const AlbumHead: FC<Props> = ({
    cover,
    author,
    releaseYear,
    tracksNumber,
    name,
    albumSongs,
}) => {
    const dispatch = usePlayerDispatch()

    const imageDimensions =
        useBreakpointValue({ base: 160, md: 200, lg: 240, xl: 264 }) ?? 160

    const playAlbum = () => {
        if (albumSongs) {
            dispatch(Msg(Player.AddSongs, { songs: albumSongs }))
        }
    }

    const albumDuration = secondToMinutesAndHours(
        albumSongs?.reduce((acc, v) => (acc += v.duration), 0) || 0
    )
    return (
        <Flex mb={16}>
            <Image
                src={cover}
                alt="album cover"
                boxSize={imageDimensions}
                objectFit="cover"
            />
            <Flex ml="48px" justifyContent="center" direction="column">
                <Heading fontSize="34px" mb={4}>
                    {name}
                </Heading>
                <Text fontWeight="400" color="whiteAlpha.700">
                    {`Album • `}
                    <Text as={StyledLink} href={`/author/${author?.id}`}>
                        {author?.name}
                    </Text>
                    {` • ${releaseYear}`}
                </Text>
                <Text fontWeight="400" color="whiteAlpha.700">
                    {`${tracksNumber} songs • ${albumDuration}`}
                </Text>
                <Button
                    mt={9}
                    bg="white"
                    color="black"
                    w={136}
                    fontSize="sm"
                    fontWeight="500"
                    h="36px"
                    borderRadius={2}
                    variant="none"
                    onClick={playAlbum}
                    leftIcon={<Icons.Play />}
                >
                    PLAY
                </Button>
            </Flex>
        </Flex>
    )
}
