import React, { useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/core'
import {
    PostSnippetFragment,
    useVoteMutation,
    VoteMutation,
} from '../generated/graphql'
import { ApolloCache } from '@apollo/client'

interface UpdootSectionProps {
    post: PostSnippetFragment
}

type UpdootStates = 'updoot-loading' | 'downdoot-loading' | 'not-loading'

const updateAfterVote = (
    value: number,
    post: PostSnippetFragment,
    cache: ApolloCache<VoteMutation>
) => {
    if (post.voteStatus === value) return

    cache.modify({
        id: cache.identify(post),
        fields: {
            points(cachedPoints, { readField }) {
                return cachedPoints + (!readField('voteStatus') ? 1 : 2) * value
            },
            voteStatus() {
                return value
            },
        },
    })
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [vote] = useVoteMutation()

    const [loadingState, setLoadingState] = useState<UpdootStates>(
        'not-loading'
    )

    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            mr={4}
        >
            <IconButton
                onClick={async () => {
                    if (post.voteStatus === 1) return

                    setLoadingState('updoot-loading')
                    await vote({
                        variables: {
                            postId: post.id,
                            value: 1,
                        },
                        update: (cache) => updateAfterVote(1, post, cache),
                    })
                    setLoadingState('not-loading')
                }}
                variantColor={post.voteStatus === 1 ? 'green' : undefined}
                isLoading={loadingState === 'updoot-loading'}
                aria-label="updoot post"
                icon="chevron-up"
            />
            {post.points}
            <IconButton
                onClick={async () => {
                    if (post.voteStatus === -1) return

                    setLoadingState('downdoot-loading')
                    await vote({
                        variables: {
                            postId: post.id,
                            value: -1,
                        },
                        update: (cache) => updateAfterVote(-1, post, cache),
                    })
                    setLoadingState('not-loading')
                }}
                variantColor={post.voteStatus === -1 ? 'red' : undefined}
                isLoading={loadingState === 'downdoot-loading'}
                aria-label="downdoot post"
                icon="chevron-down"
            />
        </Flex>
    )
}
