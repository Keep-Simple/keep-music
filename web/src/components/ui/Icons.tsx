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
    path: [
        <path
            key="loop"
            fill="currentColor"
            d="M4.393 5.536C3.643 5.536 3 6.179 3 6.929V11h1.714V7.25H18.68L16.32 9.607l1.179 1.179 4.393-4.393L17.5 2l-1.179 1.179 2.358 2.357H4.393zM6.5 13.214l-4.393 4.393L6.5 22l1.179-1.179-2.358-2.357 14.286-.071c.75 0 1.393-.643 1.393-1.393v-4.286h-1.714v3.965L5.32 16.75l2.358-2.357L6.5 13.214z"
        />,
        <path key="one" fill="currentColor" d="M13 9v6h-1.5v-4H10v-1l2-1h1z" />,
    ],
})

function AppLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 423 90"
            className="appLogo_svg__iconLeft"
            width="160px"
            {...props}
        >
            <path
                d="M139.14 46.116l11.562-14.062h-6.25l-9.911 11.92h-5V15h-5.714v46.875h5.714V48.75h5.179l10.312 13.125h6.295zm27.276-14.687c-8.705 0-13.884 5.044-13.884 14.91 0 10.625 6.295 16.161 16.295 16.161 3.393 0 7.098-.58 9.91-1.696V56.16c-3.526 1.116-7.41 1.651-10 1.651-6.339 0-10-3.035-10.714-9.464h21.206v-2.544c0-9.465-4.643-14.375-12.813-14.375zm-.09 4.24c4.911 0 7.322 3.75 7.322 8.795h-15.67c.492-6.027 3.75-8.794 8.349-8.794zm31.697-4.24c-8.66 0-13.884 5.044-13.884 14.91 0 10.625 6.34 16.161 16.34 16.161 3.348 0 7.053-.58 9.866-1.696V56.16c-3.483 1.116-7.366 1.651-10 1.651-6.295 0-10-3.035-10.67-9.464h21.16v-2.544c0-9.465-4.598-14.375-12.812-14.375zm-.044 4.24c4.866 0 7.32 3.75 7.32 8.795h-15.713c.49-6.027 3.75-8.794 8.393-8.794zM223.157 75V61.964c2.143.313 4.241.536 6.072.536 10.133 0 15.535-5.938 15.535-17.009 0-10.179-4.777-14.062-11.25-14.062-4.866 0-8.348 2.232-10.49 7.544l-.135-6.92h-5.402V75zm9.107-38.884c4.152 0 6.83 2.634 6.83 9.688 0 8.258-3.615 12.321-10.044 12.321-1.83 0-3.75-.223-5.848-.625.134-18.214 4.777-21.384 9.062-21.384zm38.393 6.384h-19.553v4.554h19.553zm13.572 19.375v-2.5c.133-9.196 2.633-23.214 8.57-23.214 2.858 0 4.063 2.143 4.063 6.651v19.063h5.67v-5.536c.58-8.928 3.125-20.178 8.482-20.178 2.902 0 4.018 2.143 4.018 6.651v19.063h5.625V41.652c0-6.16-1.696-10.179-7.812-10.179-5.045 0-8.393 3.393-10.313 9.554-.134-5.804-2.053-9.554-7.857-9.554-5.268 0-8.66 3.616-10.58 10.179l-.134-9.598h-5.447v29.821zm70.178 0V32.054h-5.625v6.16c-.134 8.215-2.232 19.51-9.732 19.51-3.348 0-4.955-1.876-4.955-6.608V32.054h-5.625v20.178c0 6.429 2.5 10.179 9.017 10.179 5.849 0 9.42-2.857 11.429-7.947l.536 7.411zm12.5-22.768c0-2.232 1.563-3.259 5.357-3.259 2.277 0 5.58.402 7.143 1.072V32.5c-1.384-.58-4.33-1.071-7.455-1.071-7.545 0-10.536 2.812-10.536 7.41 0 4.643 2.679 6.652 8.17 9.777 4.553 2.679 5.625 4.063 5.625 5.804 0 2.678-2.724 3.705-6.25 3.705-2.545 0-5.045-.402-7.947-1.34v4.465c2.098.714 5.536 1.25 8.75 1.25 5.536 0 10.938-1.652 10.938-8.125 0-5.134-2.991-7.009-7.366-9.598-4.822-2.857-6.429-3.795-6.429-5.67zm19.955-20.58v6.16h5.67v-6.16zm0 13.527v21.473c0 5.759 2.099 8.527 8.125 8.527.67 0 1.295-.09 1.965-.134v-4.51c-.625.135-1.027.135-1.607.135-2.143 0-2.813-1.429-2.813-4.108V32.054zm33.974-.313a41.051 41.051 0 00-5-.312c-10.849 0-15.625 5.803-15.625 14.196 0 10.982 8.393 16.562 18.928 16.562 1.16 0 1.786-.089 2.902-.133v-4.51a20.692 20.692 0 01-2.812.18c-8.393 0-13.26-5.18-13.26-12.322 0-5.804 3.17-9.465 10.58-9.465 1.474 0 2.724.045 4.287.313z"
                fill="#FFF"
            />
            <g fill="#FF3032">
                <path d="M90.612 68.67H81.96V27.625c0-6.367-9.982-16.676-19.343-18.1-3.933-.6-13.365-.493-17.635.02-7.884.939-21.422 12.093-21.422 18.08V68.67h-8.652V27.626C14.908 16.37 32.075 2.343 43.72.952 48.648.366 58.845.247 63.61.972c12.99 1.977 27.002 15.43 27.002 26.654V68.67zm-2.128-32.448a15.704 15.704 0 110 31.409" />
                <path d="M16.07 36.222A15.708 15.708 0 00.361 51.925a15.708 15.708 0 0015.707 15.706M67.352 57.854h-.654c-6.393 0-11.574-5.301-11.574-12.584 0-1.095.128-2.557.346-2.557h22.251C75.515 27.573 65.44 19.77 53.331 19.77c-12.113 0-22.188 7.802-24.394 22.943h22.255c.218 0 .344 1.462.344 2.557 0 7.283-5.18 12.584-11.572 12.584h-.651c-4.966 0-9.264-3.945-11.427-8.95v13.244c0 15.64 11.146 28.322 24.874 28.322 13.726 0 24.874-12.68 24.874-28.322V48.904c0 5.007-5.314 8.95-10.282 8.95zm-4.858 17.304H45.19V68.67h17.304v6.49z" />
            </g>
        </svg>
    )
}

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
    AppLogo,
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
