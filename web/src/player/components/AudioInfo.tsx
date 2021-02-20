import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { StyledLink } from '../../components/StyledLink'
import { useSelectedSong } from '../../state/player/context'

export const AudioInfo: FC = () => {
    const { cover, name, singer, views, authorId, albumId } = useSelectedSong()
    return (
        <Flex align="center" justify="center">
            <Image
                mr={4}
                src={cover}
                // h="40px"
                // w="71px"
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
                        {singer}
                    </StyledLink>
                    {/* <StyledLink href={`/album/${albumId}`}>
                        {}
                    </StyledLink> */}
                    {` • ${views} views`}
                </Text>
            </Box>
        </Flex>
    )
}
