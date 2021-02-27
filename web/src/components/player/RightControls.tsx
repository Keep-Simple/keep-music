import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Msg, Player } from '../../state/player/actionTypes'
import { usePlayerDispatch } from '../../state/player/contextHooks'
import { Icons } from '../ui/Icons'
import { GoogleCastButton } from './GoogleCastButton'
import { PanelToggle } from './PanelToggle'
import { ToggleLoop } from './ToggleLoop'
import { VolumeControl } from './VolumeControl'

export const RightControls: FC<WrapProps> = (props) => {
    const dispatch = usePlayerDispatch()
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
                <ToggleLoop />
            </WrapItem>
            <WrapItem {...iconProps}>
                <Icons.Shuffle
                    onClick={() => dispatch(Msg(Player.ShuffleList))}
                />
            </WrapItem>
            <WrapItem {...iconProps}>
                <GoogleCastButton size={6} />
            </WrapItem>
            <WrapItem {...iconProps}>
                <PanelToggle />
            </WrapItem>
        </Wrap>
    )
}
