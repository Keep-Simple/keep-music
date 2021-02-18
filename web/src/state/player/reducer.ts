import { uniqWith } from 'rambda'
import { PlayerSong, PlayerState } from './context'

export const initialPlayerState: PlayerState = {
    selectedSong: undefined,
    songs: [] as PlayerSong[],
    showPlayer: false,
    albumLoading: false,
}

export function playerReducer(
    state = initialPlayerState,
    { type, payload }: any
): PlayerState {
    switch (type) {
        case 'AUDIO_LIST_CHANGED': {
            const currentSongExists = (payload as PlayerSong[]).find(
                (s) => s._id === state.selectedSong?._id
            )
            return {
                ...state,
                songs: payload,
                showPlayer: !!payload.length,
                selectedSong: currentSongExists && state.selectedSong,
            }
        }
        case 'SET_CURRENT_PLAYING_SONG': {
            const currentSong = state.songs.find((s) => s._id === payload)

            return {
                ...state,
                selectedSong: {
                    ...currentSong!,
                    isPaused: false,
                    isLoading: false,
                },
            }
        }
        case 'SET_SONG_LOADING': {
            const currentSong = state.songs.find((s) => s._id === payload)

            return {
                ...state,
                selectedSong: {
                    ...currentSong!,
                    isPaused: false,
                    isLoading: true,
                },
            }
        }
        case 'ADD_SONGS': {
            const songs = uniqWith<PlayerSong, unknown>(
                (s1, s2) => s1._id === s2._id,
                [...payload, ...state.songs]
            )
            return {
                ...state,
                songs,
                showPlayer: true,
            }
        }
        case 'SET_CURRENT_PAUSED_SONG':
            return {
                ...state,
                selectedSong: { ...state.selectedSong!, isPaused: true },
            }
        case 'SET_ALBUM_LOADING':
            return {
                ...state,
                albumLoading: payload,
                selectedSong: payload ? undefined : state.selectedSong,
            }
        default:
            return state
    }
}
