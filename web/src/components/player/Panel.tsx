import { Box, Divider, Flex, Slide } from '@chakra-ui/react'
import React, { FC, Fragment } from 'react'
import { Msg, Player } from '../../state/player/actionTypes'
import {
    useAudioPlayer,
    usePlayer,
    useSelectedSong,
} from '../../state/player/context'
import { PanelSongLine } from '../PanelSongLine'

export const Panel: FC = ({}) => {
    const [dispatch, { showPanel, songs }] = usePlayer()
    const selectedSong = useSelectedSong()
    const { paused, loading, togglePlay } = useAudioPlayer()

    return (
        <Slide direction="bottom" in={showPanel} style={{ zIndex: 20 }}>
            <Box
                pt={12}
                px={16}
                pb="72px"
                h="92vh"
                bg="black"
                overflow="scroll"
            >
                <Flex direction="column">
                    {songs?.map((s, i) => {
                        const isCurrent = s.id === selectedSong?.id

                        const status = isCurrent
                            ? loading
                                ? 'loading'
                                : paused
                                ? 'paused'
                                : 'playing'
                            : null

                        const onClick = () => {
                            if (!isCurrent) {
                                dispatch(
                                    Msg(Player.ChangePlayIdx, { id: s.id })
                                )
                            } else {
                                togglePlay()
                            }
                        }

                        return (
                            <Fragment key={s.id}>
                                {!isCurrent && i !== 0 && (
                                    <Divider sx={{ borderColor: 'gray.500' }} />
                                )}
                                <PanelSongLine
                                    {...s}
                                    status={status}
                                    onClick={onClick}
                                />
                            </Fragment>
                        )
                    })}
                </Flex>
            </Box>
        </Slide>
    )
}
