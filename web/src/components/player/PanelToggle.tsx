import { motion } from 'framer-motion'
import { usePlayer } from '../../state/player/contextsHooks'
import { Msg, Player } from '../../state/player/types/actionTypes'
import { Icons } from '../ui/Icons'

export const PanelToggle = () => {
    const [dispatch, { showPanel }] = usePlayer()

    return (
        <motion.div
            animate={{ rotate: !showPanel ? 180 : 0 }}
            transition={{ bounce: false }}
        >
            <Icons.TogglePager
                color="white"
                onClick={() => dispatch(Msg(Player.TogglePanel))}
            />
        </motion.div>
    )
}
