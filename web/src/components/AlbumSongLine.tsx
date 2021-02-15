import { Flex, Spacer, Spinner, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { GiPauseButton } from 'react-icons/gi'
import { formatSeconds } from '../utils/formatSeconds'
import { useHover } from '../utils/hooks/useHover'
import { SongLineType } from './AlbumSongs'

export type SongLineStatus = 'paused' | 'playing' | 'loading' | null

const icons = {
    playing: <GiPauseButton color="white" size={20} />,
    loading: <Spinner color="red.500" size="sm" />,
    paused: <BsPlayFill color="white" size={24} />,
    hover: <BsPlayFill color="white" size={24} />,
}

export const AlbumSongLine: FC<
    SongLineType & { status: SongLineStatus; onClick: () => void }
> = ({ name, duration, order, status, onClick }) => {
    const [lineRef, isLineHovered] = useHover()

    const IconOrOrder = () => {
        if (isLineHovered) return icons[status || 'hover']

        return (
            icons[status!] || (
                <Text as="span" fontSize="sm" fontWeight="500">
                    {order}
                </Text>
            )
        )
    }

    return (
        <Flex
            ref={lineRef}
            h={57}
            align="center"
            px={2}
            bg={status ? 'gray.700' : undefined}
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
