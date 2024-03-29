import { ApolloClient, InMemoryCache } from '@apollo/client'
import { NextPageContext } from 'next'
import { TypedTypePolicies } from '../generated/apollo-helpers'
import { createWithApollo } from './createWithApollo'

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

export const createClient = (ctx?: NextPageContext) =>
    new ApolloClient({
        ssrMode: !!ctx,
        uri: process.env.NEXT_PUBLIC_API_URL as string,
        credentials: 'include',
        headers: {
            cookie: ctx?.req?.headers.cookie || '',
        },
        cache: new InMemoryCache({
            typePolicies,
        }),
    })

export const withApollo = createWithApollo(createClient)
