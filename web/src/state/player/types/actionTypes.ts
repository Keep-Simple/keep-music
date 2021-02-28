import { ActionMap, createMsg } from '../../../utils/typeHelpers'
import { PlayerSong, PlayerState } from './entityTypes'

export enum Player {
    AddSongs = 'ADD_SONGS',
    LoadAlbum = 'SET_ALBUM_LOADING',
    PlayNext = 'PLAY_NEXT_SONG',
    PlayPrev = 'PLAY_PREV_SONG',
    TogglePanel = 'TOGGLE_PANEL',
    ChangePlayIdx = 'CHANGE_PLAY_IDX',
    ReorderSong = 'CHANGE_SONG_ORDER',
    ShuffleList = 'SHUFFLE_LIST',
    LoopState = 'SET_LOOP_STATE',
}

type Messages = {
    [Player.AddSongs]: { songs: PlayerSong[] }
    [Player.LoadAlbum]: { isLoading: boolean; id?: number }
    [Player.ChangePlayIdx]: { id: number }
    [Player.ReorderSong]: { oldIdx: number; newIdx: number }
    [Player.LoopState]: { loop: PlayerState['loop'] }
    [Player.PlayNext]: undefined
    [Player.ShuffleList]: undefined
    [Player.PlayPrev]: undefined
    [Player.TogglePanel]: undefined
}

export type Actions = ActionMap<Messages>[keyof ActionMap<Messages>]

export const Msg = createMsg<Messages>()
