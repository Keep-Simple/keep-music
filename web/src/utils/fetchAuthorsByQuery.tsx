import { AuthorsDocument, AuthorsQuery } from '../generated/graphql'
import { createClient } from './withApollo'

export async function fetchAuthorsByQuery(query: string) {
    const apollo = createClient()
    const { data } = await apollo.query<AuthorsQuery>({
        query: AuthorsDocument,
        variables: {
            searchQuery: query,
        },
    })

    return data.authors?.map((a) => ({ value: a.id, label: a.name }))
}
