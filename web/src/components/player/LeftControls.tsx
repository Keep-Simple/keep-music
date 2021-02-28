import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import {
    useAudioPlayer,
    usePlayerDispatch,
} from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { Icons } from '../ui/Icons'

export const LeftControls: FC<WrapProps> = (props) => {
    const dispatch = usePlayerDispatch()
    const { togglePlay, paused, loading } = useAudioPlayer()

    const iconProps = {
        onClick: () => togglePlay(),
        boxSize: '40px',
    }

    const wrapperProps = {
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
        p: 2,
        cursor: 'pointer',
    }

    const MainIcon = () => {
        if (loading)
            return (
                <Icons.Loading
                    boxSize="40px"
                    thickness="3px"
                    color="gray.500"
                />
            )
        return paused ? (
            <Icons.Play {...iconProps} />
        ) : (
            <Icons.Pause {...iconProps} />
        )
    }

    return (
        <Wrap spacing={2} align="center" {...props}>
            <WrapItem {...wrapperProps}>
                <Icons.PrevSong
                    onClick={() => dispatch(Msg(Player.PlayPrev))}
                />
            </WrapItem>
            <WrapItem {...wrapperProps}>
                <MainIcon />
            </WrapItem>
            <WrapItem {...wrapperProps}>
                <Icons.NextSong
                    onClick={() => dispatch(Msg(Player.PlayNext))}
                />
            </WrapItem>
        </Wrap>
    )
}
