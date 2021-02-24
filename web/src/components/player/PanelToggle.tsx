import { motion } from 'framer-motion'
import { Msg, Player } from '../../state/player/actionTypes'
import { usePlayer } from '../../state/player/contextHooks'
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
