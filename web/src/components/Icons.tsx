import { createIcon, Spinner, SpinnerProps } from '@chakra-ui/react'
import React, { FC } from 'react'

const Loading: FC<SpinnerProps> = (props) => (
    <Spinner color="red.500" size="sm" speed=".8s" {...(props as any)} />
)

const Play = createIcon({
    displayName: 'Play',
    defaultProps: { boxSize: '24px' },
    d: 'M8 5v14l11-7z',
})

const Pause = createIcon({
    displayName: 'Pause',
    defaultProps: { boxSize: '24px' },
    d: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
})

const Sound = createIcon({
    displayName: 'Sound',
    defaultProps: { boxSize: '24px' },
    d:
        'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
})

const MutedSound = createIcon({
    displayName: 'MutedSound',
    defaultProps: { boxSize: '24px' },
    d:
        'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
})

const NextSong = createIcon({
    displayName: 'NextSong',
    defaultProps: { boxSize: '24px' },
    d: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z',
})

const PrevSong = createIcon({
    displayName: 'PrevSong',
    defaultProps: { boxSize: '24px' },
    d: 'M6 6h2v12H6zm3.5 6l8.5 6V6z',
})

const Loop = createIcon({
    displayName: 'Loop',
    defaultProps: { boxSize: '24px' },
    d:
        'M3 6.929c0-.75.643-1.393 1.393-1.393h14.286L16.32 3.179 17.5 2l4.393 4.393-4.393 4.393-1.179-1.179L18.68 7.25H4.714V11H3V6.929zM2.107 17.607L6.5 13.214l1.179 1.179L5.32 16.75l13.965-.071v-3.965H21V17c0 .75-.643 1.393-1.393 1.393l-14.286.071 2.358 2.357L6.5 22l-4.393-4.393z',
})

const LoopSingle = createIcon({
    displayName: 'LoopSingle',
    defaultProps: { boxSize: '24px' },
    d:
        'M4.393 5.536C3.643 5.536 3 6.179 3 6.929V11h1.714V7.25H18.68L16.32 9.607l1.179 1.179 4.393-4.393L17.5 2l-1.179 1.179 2.358 2.357H4.393zM6.5 13.214l-4.393 4.393L6.5 22l1.179-1.179-2.358-2.357 14.286-.071c.75 0 1.393-.643 1.393-1.393v-4.286h-1.714v3.965L5.32 16.75l2.358-2.357L6.5 13.214z',
})

const Shuffle = createIcon({
    displayName: 'Shuffle',
    defaultProps: { boxSize: '24px' },
    d:
        'M16.808 4.655l2.069 1.978h-.527c-1.656 0-3.312.68-4.458 1.814L12.797 9.75l1.179 1.246 1.317-1.527c.764-.794 1.91-1.247 3.057-1.247h.55l-2.07 2.014 1.178 1.179 4.005-3.993-4.026-3.945-1.178 1.179zm1.974 10.998l-1.974-1.888 1.18-1.179 4.024 3.945-4.004 3.993-1.178-1.179 1.954-1.901h-.434c-1.656 0-3.312-.625-4.458-1.667L8.242 9.8C7.35 9.071 6.204 8.55 4.93 8.55H2l.006-1.794 2.965.003c1.784 0 3.312.521 4.459 1.563l5.904 6.185c.765.73 1.911 1.146 3.058 1.146h.39zm-9.02-2.092l-1.52 1.394c-.892.793-2.038 1.36-3.312 1.36H2v1.588h2.93c1.783 0 3.312-.567 4.459-1.701l1.537-1.396-1.164-1.245z',
})

const TogglePager = createIcon({
    displayName: 'TogglePager',
    defaultProps: { boxSize: '32px' },
    d: 'M7 10l5 5 5-5z',
})

export const Icons = {
    Sound,
    Shuffle,
    MutedSound,
    Loop,
    LoopSingle,
    TogglePager,
    NextSong,
    PrevSong,
    Play,
    Pause,
    Loading,
}
