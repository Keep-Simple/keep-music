import {
    Button,
    Flex,
    Heading,
    Image,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import { AlbumQuery } from '../generated/graphql'
import { usePlayerDispatch } from '../state/player/contextsHooks'
import { Msg, Player } from '../state/player/types/actionTypes'
import { PlayerSong } from '../state/player/types/entityTypes'
import { secondToMinutesAndHours } from '../utils/formatSeconds'
import { Icons } from './ui/Icons'
import { StyledLink } from './ui/StyledLink'

type Props = Partial<AlbumQuery['album']> & {
    albumSongs?: PlayerSong[]
    loading: boolean
}

export const AlbumHead: FC<Props> = ({
    loading,
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
            {cover ? (
                <Image
                    src={cover}
                    alt="album cover"
                    height={imageDimensions}
                    width={imageDimensions}
                    objectFit="cover"
                />
            ) : (
                <Skeleton height={imageDimensions} width={imageDimensions} />
            )}

            <Flex ml="48px" justifyContent="center" direction="column">
                <Heading fontSize="34px" mb={4}>
                    {name || <Skeleton width={300} />}
                </Heading>

                <Text fontWeight="400" color="whiteAlpha.700">
                    {author ? (
                        <>
                            {`Album • `}
                            <Text
                                as={StyledLink}
                                href={`/author/${author?.id}`}
                            >
                                {author?.name}
                            </Text>
                            {` • ${releaseYear}`}
                        </>
                    ) : (
                        <Skeleton width={190} />
                    )}
                </Text>

                <Text fontWeight="400" color="whiteAlpha.700">
                    {albumDuration ? (
                        `${tracksNumber} songs • ${albumDuration}`
                    ) : (
                        <Skeleton width={110} />
                    )}
                </Text>

                <Button
                    mt={9}
                    borderRadius={2}
                    w={136}
                    bg="white"
                    color="black"
                    fontSize="sm"
                    fontWeight="500"
                    h="36px"
                    variant="none"
                    onClick={!loading ? playAlbum : () => null}
                    leftIcon={<Icons.Play />}
                >
                    PLAY
                </Button>
            </Flex>
        </Flex>
    )
}
