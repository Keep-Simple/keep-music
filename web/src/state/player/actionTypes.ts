import { SongType } from './entityTypes'
import { ActionMap, createMsg } from './typeHelpers'

export enum Player {
    AddSongs = 'ADD_SONGS',
    LoadAlbum = 'SET_ALBUM_LOADING',
}

type Messages = {
    [Player.AddSongs]: { songs: SongType[]; singer: string; cover: string }
    [Player.LoadAlbum]: { isLoading: boolean }
}

export type Actions = ActionMap<Messages>[keyof ActionMap<Messages>]

export const Msg = createMsg<Messages>()
