import { uniqWith } from 'rambda'
import { Actions, Player } from './actionTypes'
import { PlayerState } from './entityTypes'

export const initialPlayerState: PlayerState = {
    selectedSongIdx: 0,
    songs: [],
    showPlayer: false,
    albumLoading: false,
}

export function playerReducer(
    state = initialPlayerState,
    action: Actions
): PlayerState {
    switch (action.type) {
        case Player.AddSongs: {
            const { songs, cover, singer } = action.payload
            const newSongs = songs.map((s) => ({ ...s, singer, cover })) ?? []

            const combinedSongs = uniqWith((s1, s2) => s1.id === s2.id, [
                ...newSongs,
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
            return {
                ...state,
                albumLoading: action.payload.isLoading,
            }
        }
        default:
            return state
    }
}
