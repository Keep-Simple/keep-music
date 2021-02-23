import { Box, Center, Flex, Image, Spacer, Text } from '@chakra-ui/react'
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

export const PanelSongLine: FC<PanelSongLineType> = ({
    name,
    duration,
    status,
    singer,
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
            px={2}
            bg={status ? 'whiteAlpha.300' : undefined}
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
                        borderRadius="sm"
                        objectFit="cover"
                    />
                    <Center
                        pos="absolute"
                        bg={hovered || status ? 'blackAlpha.300' : ''}
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
