import { Box, Circle, Fade, Image, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { FC, useMemo, useState } from 'react'
import { Album, Author } from '../generated/graphql'
import { useHover } from '../utils/hooks/useHover'
import { PlayStatus } from './AlbumSongLine'
import { Icons } from './ui/Icons'
import { StyledLink } from './ui/StyledLink'

type AlbumCardProps = Pick<Album, 'name' | 'cover' | 'id'> & {
    coverSize: number
    author: Pick<Author, 'id' | 'name'>
    playStatus: PlayStatus
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
    const { hovered: isHover, bind } = useHover()
    const { hovered: isIconHover, bind: iconBind } = useHover()
    const [focused, setFocused] = useState(false)
    const [imgLoaded, setImgLoaded] = useState(false)

    const Icon = useMemo(() => {
        switch (playStatus) {
            case 'loading':
                return (
                    <>
                        <Icons.Pause />
                        <Icons.Loading
                            pos="absolute"
                            boxSize="40px"
                            thickness="2px"
                            top={0}
                            left={0}
                        />
                    </>
                )
            case 'playing':
                return focused || isIconHover ? (
                    <Icons.Pause />
                ) : (
                    <Icons.Sound />
                )
            default:
                return <Icons.Play />
        }
    }, [playStatus, focused, isIconHover])

    return (
        <Box w={coverSize} userSelect="none">
            <NextLink href={`/album/${id}`}>
                <Box {...bind} pos="relative">
                    <Fade in={imgLoaded}>
                        <Box
                            transition="all .1s ease"
                            cursor="pointer"
                            boxShadow={
                                isHover
                                    ? 'inset 0px 101px 82px 3px rgba(0,0,0,0.4)'
                                    : 'initial'
                            }
                            boxSize={coverSize}
                        >
                            <Image
                                borderRadius={4}
                                mb={2}
                                zIndex={-2}
                                border="none"
                                outline="none"
                                pos="relative"
                                objectFit="cover"
                                htmlWidth={coverSize}
                                htmlHeight={coverSize}
                                src={cover}
                                boxSize={coverSize}
                                onLoad={() => setImgLoaded(true)}
                            />
                        </Box>
                    </Fade>
                    <Fade in={isHover || !!playStatus}>
                        <Circle
                            {...iconBind}
                            bottom={5}
                            right={5}
                            opacity={playStatus ? 1 : 0.75}
                            size={10}
                            zIndex={10}
                            transition="all .1s ease"
                            bg="black"
                            outline="none"
                            cursor="pointer"
                            pos="absolute"
                            tabIndex={-1}
                            onBlur={() => {
                                setFocused(false)
                            }}
                            transform={
                                playStatus || isIconHover
                                    ? 'scale(1.1)'
                                    : 'scale(1)'
                            }
                            _hover={{
                                opacity: 1,
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                setFocused(true)
                                onIconClick()
                            }}
                        >
                            {Icon}
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
