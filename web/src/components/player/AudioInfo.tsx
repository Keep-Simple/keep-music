import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAlbumQuery } from '../../generated/graphql'
import { useSelectedSong } from '../../state/player/context'
import { StyledLink } from '../StyledLink'

export const AudioInfo: FC = () => {
    const { name, views, authorId, albumId } = useSelectedSong()
    const { data } = useAlbumQuery({ variables: { id: albumId } })

    return (
        <Flex align="center" justify="center">
            <Image
                mr={4}
                src={data?.album?.cover}
                boxSize="40px"
                alt="song cover"
                borderRadius="sm"
                objectFit="cover"
            />
            <Box>
                <Text fontSize="md" fontWeight="semibold">
                    {name}
                </Text>
                <Text color="#FFFFFFB3" mt={-1}>
                    <StyledLink href={`/author/${authorId}`}>
                        {data?.album?.author?.name}
                    </StyledLink>
                    {` • `}
                    <StyledLink href={`/album/${albumId}`}>
                        {data?.album?.name}
                    </StyledLink>
                    {` • ${views} views`}
                </Text>
            </Box>
        </Flex>
    )
}
