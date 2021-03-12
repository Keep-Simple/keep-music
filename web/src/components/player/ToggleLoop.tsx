import { usePlayer } from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { Icons } from '../ui/Icons'

export const ToggleLoop = () => {
    const [dispatch, { loop }] = usePlayer()

    switch (loop) {
        case 'one':
            return (
                <a
                    onClick={() =>
                        dispatch(Msg(Player.LoopState, { loop: null }))
                    }
                >
                    <Icons.LoopSingle color="white" />
                </a>
            )
        case 'list':
            return (
                <a
                    onClick={() =>
                        dispatch(Msg(Player.LoopState, { loop: 'one' }))
                    }
                >
                    <Icons.Loop color="white" />
                </a>
            )
        case null:
            return (
                <a
                    onClick={() =>
                        dispatch(Msg(Player.LoopState, { loop: 'list' }))
                    }
                >
                    <Icons.Loop />
                </a>
            )
    }
}
