import { PlayerSong } from './entityTypes'
import { ActionMap, createMsg } from './typeHelpers'

export enum Player {
    AddSongs = 'ADD_SONGS',
    LoadAlbum = 'SET_ALBUM_LOADING',
    PlayNext = 'PLAY_NEXT_SONG',
    PlayPrev = 'PLAY_PREV_SONG',
}

type Messages = {
    [Player.AddSongs]: { songs: PlayerSong[] }
    [Player.LoadAlbum]: { isLoading: boolean; id?: number }
    [Player.PlayNext]: undefined
    [Player.PlayPrev]: undefined
}

export type Actions = ActionMap<Messages>[keyof ActionMap<Messages>]

export const Msg = createMsg<Messages>()
