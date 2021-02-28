import { usePlayer } from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { Icons } from '../ui/Icons'

export const ToggleLoop = () => {
    const [dispatch, { loop }] = usePlayer()

    switch (loop) {
        case 'one':
            return (
                <Icons.LoopSingle
                    color="white"
                    onClick={() =>
                        dispatch(Msg(Player.LoopState, { loop: null }))
                    }
                />
            )
        case 'list':
            return (
                <Icons.Loop
                    color="white"
                    onClick={() =>
                        dispatch(Msg(Player.LoopState, { loop: 'one' }))
                    }
                />
            )
        case null:
            return (
                <Icons.Loop
                    onClick={() =>
                        dispatch(Msg(Player.LoopState, { loop: 'list' }))
                    }
                />
            )
    }
}
