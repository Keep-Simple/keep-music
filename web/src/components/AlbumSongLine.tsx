import { Flex, Spacer, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { formatSeconds } from '../utils/formatSeconds'
import { useHover } from '../utils/hooks/useHover'
import { SongLineType } from './AlbumSongs'
import { Icons } from './ui/Icons'

export type PlayStatus = 'paused' | 'playing' | 'loading' | null

const icons = {
    playing: <Icons.Pause />,
    loading: <Icons.Loading />,
    paused: <Icons.Play />,
}

export const AlbumSongLine: FC<
    SongLineType & { status: PlayStatus; onClick: () => void }
> = ({ name, duration, order, status, onClick }) => {
    const { hovered, bind } = useHover()

    const IconOrOrder = () => {
        if (hovered) return icons[status || 'paused']

        return (
            icons[status!] || (
                <Text
                    as="span"
                    fontSize="sm"
                    fontWeight="500"
                    color="whiteAlpha.700"
                >
                    {order}
                </Text>
            )
        )
    }

    return (
        <Flex
            {...bind}
            h={57}
            align="center"
            px={2}
            bg={status ? 'whiteAlpha.100' : undefined}
        >
            <Flex align="center">
                <Flex
                    cursor="pointer"
                    boxSize={8}
                    mr={4}
                    align="center"
                    justify="center"
                    onClick={onClick}
                >
                    <IconOrOrder />
                </Flex>
                <Text fontWeight="500">{name}</Text>
            </Flex>
            <Spacer />
            <Text fontWeight="400" color="whiteAlpha.700">
                {formatSeconds(duration)}
            </Text>
        </Flex>
    )
}
