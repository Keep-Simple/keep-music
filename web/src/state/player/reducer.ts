import { uniqWith } from 'rambda'
import { Actions, Player } from './actionTypes'
import { PlayerState } from './entityTypes'

export const initialPlayerState: PlayerState = {
    selectedSongIdx: 0,
    songs: [],
    showPlayer: false,
    showPanel: false,
    albumLoading: {
        state: false,
        id: undefined,
    },
}

export function playerReducer(
    state = initialPlayerState,
    action: Actions
): PlayerState {
    switch (action.type) {
        case Player.AddSongs: {
            const combinedSongs = uniqWith((s1, s2) => s1.id === s2.id, [
                ...action.payload.songs,
                ...state.songs,
            ]) as PlayerState['songs']

            return {
                ...state,
                songs: combinedSongs,
                selectedSongIdx: 0,
                showPlayer: true,
            }
        }
        case Player.LoadAlbum: {
            const { id, isLoading } = action.payload
            return {
                ...state,
                albumLoading: {
                    id,
                    state: isLoading,
                },
            }
        }
        case Player.PlayNext: {
            return {
                ...state,
                selectedSongIdx:
                    (state.selectedSongIdx + 1) % state.songs.length,
            }
        }
        case Player.PlayPrev: {
            let newIdx = state.selectedSongIdx - 1
            newIdx = newIdx < 0 ? state.songs.length - 1 : newIdx

            return {
                ...state,
                selectedSongIdx: newIdx,
            }
        }
        case Player.TogglePanel: {
            return {
                ...state,
                showPanel: !state.showPanel,
            }
        }
        case Player.ChangePlayIdx: {
            return {
                ...state,
                selectedSongIdx: state.songs.findIndex(
                    (s) => s.id === action.payload.id
                ),
            }
        }
        default:
            return state
    }
}
