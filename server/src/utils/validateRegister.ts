import { AuthInput } from '../resolvers/user'

const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function validateEmail(email?: string) {
    if (!email) return false
    return regex.test(email)
}

export function validateRegistration({ email, username, password }: AuthInput) {
    // Validate
    const errors = []

    if (!validateEmail(email)) {
        errors.push({
            field: 'email',
            message: 'invalid email',
        })
    }
    if (username.includes('@')) {
        errors.push({
            field: 'username',
            message: 'invalid name',
        })
    }
    if (username.length <= 2) {
        errors.push({
            field: 'username',
            message: 'length must be greater than 2',
        })
    }
    if (password.length <= 3) {
        errors.push({
            field: 'password',
            message: 'length must be greater than 3',
        })
    }

    return errors
}
