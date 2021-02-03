import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'
import { withApollo } from '../utils/withApollo'

const CreatePost: React.FC<{}> = () => {
    useIsAuth()
    const router = useRouter()
    const [createPost] = useCreatePostMutation()

    return (
        <Layout variant="small">
            <Formik
                initialValues={{ title: '', text: '' }}
                onSubmit={async (values) => {
                    const { errors } = await createPost({
                        variables: { input: values },
                        update(cache) {
                            cache.evict({ fieldName: 'posts' })
                        },
                    })
                    if (!errors) router.back()
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="The Great Title"
                            label="Post Title"
                        />
                        <Box mt={4}>
                            <InputField
                                name="text"
                                placeholder="Start your awasome post..."
                                label="Body"
                                textarea
                            />
                        </Box>
                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type="submit"
                            variantColor="teal"
                        >
                            Create Post
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(CreatePost)
