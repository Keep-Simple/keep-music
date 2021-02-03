import { IconButton } from '@chakra-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

type Props = {
    postId: number
    creatorId: number
}

export const EditDeletePostButtons: React.FC<Props> = ({
    postId,
    creatorId,
}) => {
    const { data: meData } = useMeQuery()
    const [deletePost] = useDeletePostMutation()

    if (creatorId !== meData?.me?.id) return null
    return (
        <>
            <IconButton
                icon="delete"
                aria-label="delete post"
                float="right"
                ml={3}
                onClick={() =>
                    deletePost({
                        variables: { id: postId },
                        update(cache) {
                            cache.evict({ id: 'Post:' + postId })
                        },
                    })
                }
            />
            <NextLink href={`/post/edit/${postId}`}>
                <IconButton icon="edit" aria-label="edit post" float="right" />
            </NextLink>
        </>
    )
}
