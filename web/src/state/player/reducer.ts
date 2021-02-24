import { uniqWith } from 'rambda'
import { shuffle } from '../../utils/shuffleArray'
import { reorder } from '../../utils/swapElements'
import { Actions, Player } from './actionTypes'
import { PlayerState } from './entityTypes'

export const initialPlayerState: PlayerState = {
    selectedSongIdx: 0,
    songs: [],
    showPlayer: false,
    showPanel: false,
    loop: null,
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
            const curIdx = state.selectedSongIdx
            let idx
            switch (state.loop) {
                case 'list':
                    idx = (curIdx + 1) % state.songs.length
                    break
                case 'one':
                    idx = curIdx
                    break
                case null:
                    idx = Math.min(curIdx + 1, state.songs.length - 1)
                    break
            }
            return {
                ...state,
                selectedSongIdx: idx,
            }
        }
        case Player.PlayPrev: {
            const curIdx = state.selectedSongIdx
            let newIdx = curIdx - 1
            newIdx = newIdx < 0 ? state.songs.length - 1 : newIdx

            return {
                ...state,
                selectedSongIdx: state.loop === 'one' ? curIdx : newIdx,
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
        case Player.ReorderSong: {
            const { oldIdx, newIdx } = action.payload
            const selectedSongId = state.songs[state.selectedSongIdx].id
            const newSongs = reorder(state.songs, oldIdx, newIdx)

            return {
                ...state,
                songs: newSongs,
                selectedSongIdx: newSongs.findIndex(
                    (s) => s.id === selectedSongId
                ),
            }
        }
        case Player.ShuffleList: {
            const newSongs = shuffle(
                state.songs.filter((_, idx) => idx !== state.selectedSongIdx)
            )
            return {
                ...state,
                songs: [state.songs[state.selectedSongIdx], ...newSongs],
                selectedSongIdx: 0,
            }
        }
        case Player.LoopState: {
            return {
                ...state,
                loop: action.payload.loop,
            }
        }
        default:
            return state
    }
}
