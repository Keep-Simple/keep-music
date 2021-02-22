import { Box, Slide } from '@chakra-ui/react'
import React, { FC } from 'react'
import { usePlayerState } from '../../state/player/context'

export const Panel: FC = ({}) => {
    const { showPanel } = usePlayerState()
    return (
        <Slide direction="bottom" in={showPanel} style={{ zIndex: 20 }}>
            <Box
                p="40px"
                color="white"
                mt="4"
                h="92vh"
                bg="teal.500"
                rounded="md"
                shadow="md"
            ></Box>
        </Slide>
    )
}
