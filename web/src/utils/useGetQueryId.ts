import { useRouter } from 'next/router'
import { getNumber } from './parseNumber'

export const useGetQueryId = () => {
    const router = useRouter()

    const id = getNumber(router.query.id, -1)

    return id
}
