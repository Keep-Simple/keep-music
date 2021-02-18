import { Box, Circle, Fade, Image, Spinner, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { FC, useState } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { GiPauseButton, GiSpeaker } from 'react-icons/gi'
import { Album } from '../../../server/src/entities/Album'
import { Author } from '../../../server/src/entities/Author'
import { useHover } from '../utils/hooks/useHover'
import { PlayStatus } from './AlbumSongLine'
import { StyledLink } from './StyledLink'

const icons = {
    focus: <GiPauseButton color="white" size={20} />,
    loading: (
        <>
            <BsPlayFill color="white" size={24} />
            <Spinner
                pos="absolute"
                color="red.500"
                h="40px"
                w="40px"
                thickness="3px"
                speed=".8s"
                top={0}
                left={0}
            />
        </>
    ),
    playing: <GiSpeaker color="white" size={24} />,
    paused: <BsPlayFill color="white" size={24} />,
}

type AlbumCardProps = Pick<Album, 'name' | 'cover' | 'id'> & {
    coverSize: number
    author: Pick<Author, 'id' | 'name'>
    playStatus: PlayStatus
    onIconClick: () => void
}

export const AlbumCard: FC<AlbumCardProps> = ({
    id,
    coverSize,
    cover,
    onIconClick,
    playStatus,
    name,
    author,
}) => {
    const [ref, isHover] = useHover()
    const [iconRef, isIconHover] = useHover()
    const [focused, setFocused] = useState(false)

    const Icon = () => {
        switch (playStatus) {
            case 'loading':
                return icons.loading
            case 'playing':
                return focused || isIconHover ? icons.focus : icons.playing
            default:
                return icons.paused
        }
    }

    return (
        <Box w={coverSize}>
            <NextLink href={`/album/${id}`}>
                <Box ref={ref} pos="relative">
                    <Box
                        transition="all .1s ease"
                        cursor="pointer"
                        zIndex={12}
                        boxShadow={
                            isHover
                                ? 'inset 0px 101px 82px 3px rgba(0,0,0,0.4)'
                                : 'initial'
                        }
                    >
                        <Image
                            borderRadius={4}
                            mb={2}
                            zIndex={-2}
                            src={cover}
                            boxSize={coverSize}
                            pos="relative"
                            alt="album cover"
                            objectFit="cover"
                        />
                    </Box>
                    <Fade in={isHover || !!playStatus}>
                        <Circle
                            ref={iconRef}
                            bottom={5}
                            right={5}
                            opacity={playStatus ? 1 : 0.75}
                            size={10}
                            transition="all .1s ease"
                            bg="black"
                            outline="none"
                            cursor="pointer"
                            pos="absolute"
                            tabIndex={-1}
                            onBlur={() => {
                                setFocused(false)
                            }}
                            onFocus={() => {
                                setFocused(true)
                                onIconClick()
                            }}
                            transform={
                                playStatus || isIconHover
                                    ? 'scale(1.1)'
                                    : 'scale(1)'
                            }
                            _hover={{
                                opacity: 1,
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                onIconClick()
                            }}
                        >
                            <Icon />
                        </Circle>
                    </Fade>
                </Box>
            </NextLink>
            <StyledLink href={`/album/${id}`}>
                <Text fontWeight="600" fontSize="sm" isTruncated>
                    {name}
                </Text>
            </StyledLink>
            <Text
                fontSize="sm"
                fontWeight="400"
                color="whiteAlpha.700"
                isTruncated
            >
                {`Album • `}
                <Text
                    as={StyledLink}
                    href={`/author/${author.id}`}
                    fontSize="sm"
                >
                    {author.name}
                </Text>
            </Text>
        </Box>
    )
}
