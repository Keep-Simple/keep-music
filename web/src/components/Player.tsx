import { useContext } from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { AppContext } from '../pages/_app'

const Player = ({}) => {
    const { state } = useContext(AppContext)
    return (
        <>
            <ReactJkMusicPlayer
                mode="full"
                showMediaSession
                quietUpdate
                audioLists={state}
            />
        </>
    )
}

export default Player
