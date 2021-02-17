import { AlbumCardList } from '../components/AlbumCardList'
import { Layout } from '../components/Layout'
import { withApollo } from '../utils/withApollo'

const Index = () => {
    return (
        <Layout>
            <AlbumCardList />
        </Layout>
    )
}

export default withApollo({ ssr: true })(Index)
