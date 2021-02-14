import { pick, uniqWith } from 'rambda'
import { createContext, Dispatch } from 'react'
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player'
import { Song } from '../generated/graphql'

type PlayerSong = ReactJkMusicPlayerAudioListProps

export const addSongsAction = (
    songs: Partial<Song>[],
    singer: string,
    cover: string
) => {
    return {
        type: 'ADD_SONGS',
        payload:
            songs.map((s) => ({
                singer,
                cover,
                musicSrc: s.link,
                ...pick(['id', 'name', 'duration'], s),
            })) ?? [],
    }
}

type PlayerState = {
    songs: readonly PlayerSong[]
    showPlayer: boolean
}

export const initialPlayerState: PlayerState = {
    songs: [] as PlayerSong[],
    showPlayer: true,
}

export function playerReducer(
    state = initialPlayerState,
    action: any
): PlayerState {
    switch (action.type) {
        case 'ADD_SONGS':
            return {
                ...state,
                songs: uniqWith<PlayerSong, unknown>(
                    (s1, s2) => s1.musicSrc === s2.musicSrc,
                    [...action.payload, ...state.songs]
                ),
            }
        default:
            return state
    }
}

export type PlayerContextType = {
    state: ReturnType<typeof playerReducer>
    dispatch: Dispatch<any>
}

export const PlayerContext = createContext({
    state: initialPlayerState,
    dispatch: () => null,
} as PlayerContextType)
