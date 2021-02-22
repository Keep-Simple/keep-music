import { ActionMap, createMsg } from '../../utils/typeHelpers'
import { PlayerSong } from './entityTypes'

export enum Player {
    AddSongs = 'ADD_SONGS',
    LoadAlbum = 'SET_ALBUM_LOADING',
    PlayNext = 'PLAY_NEXT_SONG',
    PlayPrev = 'PLAY_PREV_SONG',
    TogglePanel = 'TOGGLE_PANEL',
}

type Messages = {
    [Player.AddSongs]: { songs: PlayerSong[] }
    [Player.LoadAlbum]: { isLoading: boolean; id?: number }
    [Player.PlayNext]: undefined
    [Player.PlayPrev]: undefined
    [Player.TogglePanel]: undefined
}

export type Actions = ActionMap<Messages>[keyof ActionMap<Messages>]

export const Msg = createMsg<Messages>()
