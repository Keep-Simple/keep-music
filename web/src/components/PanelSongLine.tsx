import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Song } from '../generated/graphql'
import { formatSeconds } from '../utils/formatSeconds'
import { useHover } from '../utils/hooks/useHover'
import { Icons } from './ui/Icons'

export type PlayStatus = 'paused' | 'playing' | 'loading' | null

export type PanelSongLineType = Pick<
    Song,
    'id' | 'name' | 'duration' | 'link' | 'albumId' | 'authorId'
> & { status: PlayStatus; onClick: () => void; singer: string; cover: string }

const icons = {
    playing: <Icons.Pause />,
    loading: <Icons.Loading />,
    paused: <Icons.Play />,
}

export const PanelSongLine: FC<PanelSongLineType> = ({
    name,
    duration,
    status,
    singer,
    cover,
    onClick,
}) => {
    const { hovered, bind } = useHover()

    const IconOrOrder = () => {
        if (hovered) return icons[status || 'paused']

        return icons[status!] || null
    }

    return (
        <Flex
            {...bind}
            h={57}
            align="center"
            px={2}
            bg={status ? 'whiteAlpha.300' : undefined}
        >
            <Flex align="center" justify="center">
                <Image
                    mr={4}
                    src={cover}
                    boxSize={8}
                    alt="song cover"
                    borderRadius="sm"
                    objectFit="cover"
                    onClick={onClick}
                />
                <Box>
                    <Text fontSize="md" fontWeight="semibold">
                        {name}
                    </Text>
                    <Text color="#FFFFFFB3" mt={-1}>
                        {singer}
                    </Text>
                </Box>
            </Flex>
            <Spacer />
            <Text fontWeight="400" color="whiteAlpha.700">
                {formatSeconds(duration)}
            </Text>
        </Flex>
    )
}
