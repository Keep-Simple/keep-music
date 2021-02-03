import { ApolloClient, InMemoryCache } from '@apollo/client'
import { NextPageContext } from 'next'
import { createWithApollo } from './createWithApollo'
import { TypedTypePolicies } from '../generated/apollo-helpers'
import { isServer } from './isServer'

const typePolicies: TypedTypePolicies = {
    Query: {
        fields: {
            posts: {
                keyArgs: [],
                merge(existing = [], incoming = []) {
                    return existing.concat(incoming)
                },
            },
        },
    },
}

const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        uri: process.env.NEXT_PUBLIC_API_URL as string,
        credentials: 'include',
        headers: {
            cookie: isServer() ? ctx?.req?.headers.cookie || '' : '',
        },
        cache: new InMemoryCache({
            typePolicies,
        }),
    })

export const withApollo = createWithApollo(createClient)
