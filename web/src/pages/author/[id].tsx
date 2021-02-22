import { Box } from '@chakra-ui/react'
import React from 'react'
import AlertUI from '../../components/ui/Alert'
import { Layout } from '../../components/ui/Layout'
import { Loading } from '../../components/ui/Loading'
import { useAuthorQuery } from '../../generated/graphql'
import { useGetQueryId } from '../../utils/hooks/useGetQueryId'
import { withApollo } from '../../utils/withApollo'

const Author = () => {
    const id = useGetQueryId()
    const { data, error, loading } = useAuthorQuery({
        variables: { id, limit: 6 },
    })

    const skeleton = (body: any) => <Layout>{body}</Layout>

    if (error) return skeleton(<AlertUI message={error?.message} />)

    if (!loading && !data)
        return skeleton(
            <AlertUI message="No such artist found" status="info" />
        )

    if (!data && loading) return skeleton(<Loading />)

    if (data?.author) {
        return skeleton(
            <Box px="6%" pb="5%">
                {data.author.name}
            </Box>
        )
    }
}

export default withApollo({ ssr: true })(Author)
