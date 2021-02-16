import { Box, Circle, Image, Text } from '@chakra-ui/react'
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
}

export const AlbumCard: FC<AlbumCardProps> = ({
    id,
    coverSize,
    cover,
    name,
    author,
}) => {
    const [ref, isHover] = useHover()
    return (
        <Box w={coverSize}>
            <NextLink href={`/album/${id}`}>
                <Box ref={ref} pos="relative">
                    <Image
                        cursor="pointer"
                        src={cover}
                        alt="album cover"
                        borderRadius={4}
                        boxSize={coverSize}
                        objectFit="cover"
                        mb={2}
                    />
                    {isHover && (
                        <Circle
                            cursor="pointer"
                            onClick={(e) => e.stopPropagation()}
                            pos="absolute"
                            bottom={5}
                            right={5}
                            opacity={0.9}
                            size="35px"
                            bg="black"
                        >
                            <BsPlayFill color="white" size={24} />
                        </Circle>
                    )}
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
                {`Album • ${author.name}`}
            </Text>
        </Box>
    )
}
