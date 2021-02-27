import { Box } from '@chakra-ui/react'
import React from 'react'

export const GoogleCastButton = ({
    size = 8,
    disconnectedColor = '#909090',
    connectedColor = 'white',
}) => {
    const Button = React.createElement('google-cast-launcher', {
        id: 'castbutton',
        style: {
            display: 'block',
            opacity: 0.9,
            border: 'none',
            outline: 'none',
        },
    })

    return (
        <Box
            boxSize={size}
            cursor="pointer"
            sx={{
                '--disconnected-color': disconnectedColor,
                '--connected-color': connectedColor,
            }}
        >
            {Button}
        </Box>
    )
}
