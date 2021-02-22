import { Box, CloseButton, Image } from '@chakra-ui/react'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import React, { FC } from 'react'
import { useHover } from '../../utils/hooks/useHover'

type Props = {
    src?: string
    uppy: Uppy.Uppy<Uppy.TypeChecking>
    onDelete: () => void
    imageSize: number
}

export const PhotoDragDrop: FC<Props> = ({
    src,
    uppy,
    onDelete,
    imageSize,
}) => {
    const { bind, hovered } = useHover()

    return (
        <Box
            color={hovered && src ? 'white' : 'black'}
            position="relative"
            {...bind}
        >
            {src ? (
                <>
                    <Image
                        src={src}
                        borderRadius={4}
                        objectFit="cover"
                        name="cover photo"
                        boxSize={imageSize}
                    />

                    <CloseButton
                        display={hovered ? 'initial' : 'none'}
                        onClick={onDelete}
                        position="absolute"
                        size="lg"
                        top={2}
                        right={2}
                    />
                </>
            ) : (
                <DragDrop
                    height={imageSize}
                    uppy={uppy}
                    locale={{
                        strings: {
                            dropHereOr: 'Drop here or %{browse}',
                            browse: 'browse',
                        },
                    }}
                />
            )}
        </Box>
    )
}
