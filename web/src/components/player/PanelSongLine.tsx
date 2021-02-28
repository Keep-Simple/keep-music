import { Box, Center, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { PlayerSong } from '../../state/player/types/entityTypes'
import { formatSeconds } from '../../utils/formatSeconds'
import { useHover } from '../../utils/hooks/useHover'
import { Icons } from '../ui/Icons'

export type PlayStatus = 'paused' | 'playing' | 'loading' | null

export type PanelSongLineType = PlayerSong & {
    status: PlayStatus
    onClick: () => void
    isDragging?: boolean
}

export const PanelSongLine: FC<PanelSongLineType> = ({
    isDragging,
    name,
    duration,
    status,
    author,
    cover,
    onClick,
}) => {
    const { hovered, bind } = useHover()

    const Icon = () => {
        switch (status) {
            case 'loading':
                return <Icons.Loading boxSize={5} />
            case 'playing':
                return hovered ? <Icons.Pause /> : <Icons.Sound />
            case 'paused':
                return <Icons.Play />
            default:
                return hovered ? <Icons.Play /> : null
        }
    }

    return (
        <Flex
            {...bind}
            h={57}
            align="center"
            cursor="grabbing"
            px={2}
            bg={status || isDragging ? 'whiteAlpha.100' : undefined}
        >
            <Flex align="center" justify="center">
                <Box
                    pos="relative"
                    cursor="pointer"
                    boxSize={8}
                    mr={4}
                    onClick={onClick}
                >
                    <Image
                        src={cover}
                        alt="song cover"
                        boxSize={8}
                        borderRadius="sm"
                        objectFit="cover"
                    />
                    <Center
                        pos="absolute"
                        bg={hovered || status ? 'blackAlpha.500' : ''}
                        top={0}
                        bottom={0}
                        right={0}
                        left={0}
                    >
                        <Icon />
                    </Center>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="semibold">
                        {name}
                    </Text>
                    <Text color="#FFFFFFB3" mt={-1}>
                        {author}
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
