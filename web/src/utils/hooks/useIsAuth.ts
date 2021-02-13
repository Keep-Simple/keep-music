import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../../generated/graphql'

export function useIsAuth() {
    const router = useRouter()
    const { data, loading } = useMeQuery()

    useEffect(() => {
        if (!loading && !data?.me) {
            router.replace('/login?next=' + router.route)
        }
    }, [loading, data])
}
