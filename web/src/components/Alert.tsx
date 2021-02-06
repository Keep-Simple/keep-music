import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react'

interface AlertUIProps {
    message?: string | JSX.Element
    status?: AlertProps['status']
}

const AlertUI: React.FC<AlertUIProps> = ({ message, status = 'error' }) => {
    if (!message) return null

    return (
        <Alert mt={2} status={status}>
            <AlertIcon />
            {message}
        </Alert>
    )
}

export default AlertUI
