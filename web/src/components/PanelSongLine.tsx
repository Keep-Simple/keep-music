import { Flex, Spacer, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Song } from '../generated/graphql'
import { formatSeconds } from '../utils/formatSeconds'
import { useHover } from '../utils/hooks/useHover'
import { Icons } from './ui/Icons'

export type PlayStatus = 'paused' | 'playing' | 'loading' | null

export type PanelSongLineType = Pick<
    Song,
    'id' | 'name' | 'duration' | 'link' | 'albumId' | 'authorId'
> & { status: PlayStatus; onClick: () => void }

const icons = {
    playing: <Icons.Pause />,
    loading: <Icons.Loading />,
    paused: <Icons.Play />,
}

export const PanelSongLine: FC<PanelSongLineType> = ({
    name,
    duration,
    status,
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
            bg={status ? 'gray.600' : undefined}
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
