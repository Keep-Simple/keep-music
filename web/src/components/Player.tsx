import { useContext } from 'react'
import ReactJkMusicPlayer, {
    ReactJkMusicPlayerProps,
} from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { PlayerContext } from '../state/player'

const Player = () => {
    const { state } = useContext(PlayerContext)

    return (
        <>
            {state.showPlayer && (
                <ReactJkMusicPlayer
                    remove
                    showMediaSession
                    glassBg
                    clearPriorAudioLists
                    showThemeSwitch={false}
                    showReload={false}
                    showDownload={false}
                    audioLists={
                        state.songs as ReactJkMusicPlayerProps['audioLists']
                    }
                    mode="full"
                />
            )}
        </>
    )
}

export default Player
