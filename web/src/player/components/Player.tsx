import { useAudioPlayer } from 'react-use-audio-player'
import { usePlayerState, useSelectedSong } from '../../state/player/context'
import { ProgressBar } from './ProgressBar'

const Player = () => {
    const { showPlayer } = usePlayerState()
    const selectedSong = useSelectedSong()
    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: selectedSong.link,
        autoplay: true,
        html5: true,
        onend: () => console.log('sound has ended!'),
    })

    if (!showPlayer) return null

    return <ProgressBar />
}

export default Player
