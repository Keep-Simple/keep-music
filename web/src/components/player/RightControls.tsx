import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Icons } from '../ui/Icons'
import { PanelToggle } from './PanelToggle'
import { VolumeControl } from './VolumeControl'

export const RightControls: FC<WrapProps> = (props) => {
    const iconProps = {
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
        p: 2,
        cursor: 'pointer',
    }

    return (
        <Wrap
            spacing={2}
            align="center"
            justify="flex-end"
            color="gray.500"
            mr={3}
            {...props}
        >
            <WrapItem {...iconProps}>
                <VolumeControl />
            </WrapItem>
            <WrapItem {...iconProps}>
                <Icons.Loop />
            </WrapItem>
            <WrapItem {...iconProps}>
                <Icons.Shuffle />
            </WrapItem>
            <WrapItem {...iconProps}>
                <PanelToggle />
            </WrapItem>
        </Wrap>
    )
}
