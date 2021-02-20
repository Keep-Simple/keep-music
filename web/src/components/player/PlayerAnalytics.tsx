// import { useApolloClient } from '@apollo/client'
// import { useRef, useState } from 'react'

// const defaultPlayProgress = {
//     progress: 0,
//     currentTime: 0,
//     duration: 0,
//     viewSent: false,
// }

// const PROGRESS_WHEN_SEND_VIEW = 0.25
// const {
//     currentTime: prevTime,
//     progress: prevProgress,
//     viewSent,
// } = playProgress.current

// const timeDiff = currentTime - prevTime

// // user changed slider position
// if (Math.abs(timeDiff) > 0.3) {
//     playProgress.current = {
//         currentTime,
//         duration,
//         viewSent,
//         progress: prevProgress,
//     }
// } else {
//     const progress = prevProgress + timeDiff / duration

//     // send view mutation
//     if (progress > PROGRESS_WHEN_SEND_VIEW && !viewSent) {
//         setView(true)
//     }

//     playProgress.current = {
//         currentTime,
//         duration,
//         progress,
//         viewSent,
//     }
// }

export const PlayerAnalytics = () => {
    // const [sendView, setView] = useState(false)
    // const apolloClient = useApolloClient()
    // const playProgress = useRef(defaultPlayProgress)

    // useEffect(() => {
    //     if (sendView && state.selectedSong?._id) {
    //         apolloClient
    //             .mutate<ViewSongMutation, ViewSongMutationVariables>({
    //                 mutation: ViewSongDocument,
    //                 variables: { id: state.selectedSong?._id },
    //             })
    //             .then(() => {
    //                 setView(false)
    //                 playProgress.current = {
    //                     ...defaultPlayProgress,
    //                     viewSent: true,
    //                 }
    //             })
    //     }
    // }, [sendView])
    return null
}
