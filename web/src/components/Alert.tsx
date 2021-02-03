import { Alert, AlertIcon, IAlert } from '@chakra-ui/core/dist/Alert'

interface AlertProps {
    message?: string | JSX.Element
    status?: IAlert['status']
}

const AlertUI: React.FC<AlertProps> = ({ message, status = 'error' }) => {
    if (!message) return null

    return (
        <Alert mt={2} status={status}>
            <AlertIcon />
            {message}
        </Alert>
    )
}

export default AlertUI
