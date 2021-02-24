import { Box, Divider } from '@chakra-ui/react'
import React, { FC } from 'react'
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'
import { Msg, Player } from '../../state/player/actionTypes'
import { usePlayerDispatch } from '../../state/player/contextHooks'
import { PanelSongLine, PanelSongLineType } from './PanelSongLine'

export const PanelSongs: FC<{ songs: PanelSongLineType[] }> = ({ songs }) => {
    const dispatch = usePlayerDispatch()

    function onDragEnd(result: DropResult) {
        if (
            !result.destination ||
            result.destination.index === result.source.index
        ) {
            return
        }

        dispatch(
            Msg(Player.ReorderSong, {
                oldIdx: result.source.index,
                newIdx: result.destination.index,
            })
        )
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="playlist">
                {(provided) => (
                    <Box
                        bg="black"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {songs?.map((s, i) => {
                            return (
                                <Draggable
                                    key={s.id}
                                    draggableId={String(s.id)}
                                    index={i}
                                >
                                    {(provided, { isDragging }) => (
                                        <Box
                                            ref={provided.innerRef}
                                            bg="black"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {!s.status && i !== 0 && (
                                                <Divider
                                                    sx={{
                                                        borderColor:
                                                            'whiteAlpha.400',
                                                    }}
                                                />
                                            )}
                                            <PanelSongLine
                                                {...s}
                                                isDragging={isDragging}
                                            />
                                        </Box>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    )
}
