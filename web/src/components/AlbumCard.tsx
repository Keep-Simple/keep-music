import { Box, Circle, Fade, Icon, Image, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { FC } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { Album } from '../../../server/src/entities/Album'
import { Author } from '../../../server/src/entities/Author'
import { useHover } from '../utils/hooks/useHover'
import { StyledLink } from './StyledLink'

type AlbumCardProps = Pick<Album, 'name' | 'cover' | 'id'> & {
    coverSize: number
    author: Pick<Author, 'id' | 'name'>
    playStatus: 'loading' | 'playing' | 'paused' | null
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

    return (
        <Box w={coverSize}>
            <NextLink href={`/album/${id}`}>
                <Box ref={ref} pos="relative">
                    <Box
                        transition="all .1s ease"
                        cursor="pointer"
                        boxShadow={
                            isHover && !playStatus
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
                    <Fade in={isHover || playStatus}>
                        <Circle
                            bottom={5}
                            right={5}
                            cursor="pointer"
                            opacity={playStatus ? 1 : 0.7}
                            pos="absolute"
                            transform={
                                playStatus || isHover ? 'scale(1.1)' : ''
                            }
                            size={10}
                            transition="all .1s ease"
                            bg="black"
                            _hover={{
                                opacity: 1,
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                onIconClick()
                            }}
                        >
                            <Icon as={BsPlayFill} color="white" boxSize={6} />
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
